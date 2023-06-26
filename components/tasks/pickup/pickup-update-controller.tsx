import { useRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import { newPickupTaskState } from '~/store/task-update';
import { QueryKeys } from '~/constants/query-keys';

import { UpdateChip } from '~/components/common/update/update-chip';

export const PickupUpdateController: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useRecoilState(newPickupTaskState);

  const onClick = () => {
    queryClient.invalidateQueries([QueryKeys.PICKUP_TASK]);
    setNewTask(false);
  };

  return (
    <UpdateChip
      show={newTask}
      onClick={onClick}
      sx={{
        position: 'sticky',
        mx: 'auto',
        // TODO: improve handling dynamic app bar height
        top: 56,
        '@media (min-width:0px)': {
          '@media (orientation: landscape)': { top: 48 },
        },
        '@media (min-width:600px)': { top: 64 },
      }}
    />
  );
};
