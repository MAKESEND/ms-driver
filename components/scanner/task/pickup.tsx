import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

import { parseContent } from '~/utils/parse-content';
import { ScannedResult } from '~/providers/scanner-provider';
import { ModalActionTypes, useModal } from '~/providers/modal-provider';

import { type TaskTypes } from '~/constants/tasks';
import { useState } from 'react';

export interface ScannerPickupTaskProps {
  task: `${TaskTypes}`;
  scannedResult: React.MutableRefObject<ScannedResult[]>;
}

export const ScannerPickupTask: React.FC<ScannerPickupTaskProps> = ({
  scannedResult,
}) => {
  console.log('render modal');
  const { dispatch: handleModal } = useModal();
  const [, setRerender] = useState<boolean>(false);

  const tasks = scannedResult.current.filter((item) =>
    parseContent.isParcelId(item.text)
  );

  const parcels = tasks.reduce((store, task) => {
    let newStore = [...store];
    const res = parseContent.extractParcelId(task.text);
    if (res) {
      newStore.push({ ...task, parcelId: res[0] });
    }
    return newStore;
  }, [] as (ScannedResult & { parcelId: string })[]);

  return (
    <List>
      {parcels.map(({ parcelId, scannedAt }) => {
        if (!parcelId) return null;

        return (
          <ListItem
            key={parcelId}
            secondaryAction={
              <IconButton
                onClick={() => {
                  scannedResult.current = scannedResult.current.filter(
                    (item) => item.scannedAt !== scannedAt
                  );

                  if (!scannedResult.current.length) {
                    handleModal({ type: ModalActionTypes.CloseModal });
                  }

                  setRerender((prev) => !prev);
                }}
              >
                <DeleteOutline />
              </IconButton>
            }
          >
            <ListItemText>{parcelId}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};
