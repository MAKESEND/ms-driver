import { useRouter } from 'next/router';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import { useSetRecoilState } from 'recoil';
import { scannedParcelIds } from '~/store/scanner';

import { ScannerPickupTask } from '~/components/scanner/task/pickup';

import { ScannerActionTypes, useScanner } from '~/providers/scanner-provider';
import { useModal, ModalActionTypes } from '~/providers/modal-provider';
import { useToast, ToastActionTypes } from '~/providers/toast-provider';

export const ScannerBottomNav: React.FC = () => {
  // TODO: handle with i18n
  const readLabel = 'Check';
  const modalTitle = 'Scanned Result';

  const router = useRouter();
  const setScannedParcelIds = useSetRecoilState(scannedParcelIds);

  const { dispatch: handleModal } = useModal();
  const { dispatch: handleToast } = useToast();
  const {
    state: {
      config: { task, mode },
    },
    dispatch,
    scannedResultRef,
  } = useScanner();

  // TODO: remove active flag to handle other config
  const active = (task === 'pickup' || task === 'dropoff') && mode === 'bulk';
  // this works as useToast cause rerender when ever a new result is scanned
  const disabled = !scannedResultRef.current.length || !active;

  const onClick = () => {
    const hasRecords = scannedResultRef.current.length;
    if (hasRecords) {
      dispatch({ type: ScannerActionTypes.CloseScanner });
      if ((mode === 'bulk' && task === 'dropoff') || task === 'pickup') {
        handleModal({
          type: ModalActionTypes.OpenModal,
          payload: {
            title: modalTitle,
            content: (
              <ScannerPickupTask task={task} scannedResult={scannedResultRef} />
            ),
            confirmBtn: 'Go Pickup',
            onConfirm: () => {
              handleModal({ type: ModalActionTypes.CloseModal });
              handleToast({ type: ToastActionTypes.CloseToast });

              // TODO: handle to return correct destination
              setScannedParcelIds(['EX2302080835468', 'EX2305121740126']);
              const mockParcelId = 'EX2305121740126';
              const mockOrderId = 'MS2209122229999';
              const taskId = task === 'dropoff' ? mockParcelId : mockOrderId;
              router.push(`/tasks/${task}/${taskId}`);
            },
          },
        });
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        border: 'none',
        justifySelf: 'flex-end',
        mt: 'auto',
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          disabled={disabled}
          label={readLabel}
          onClick={onClick}
          sx={{
            ['&>*']: {
              color: (theme) =>
                disabled ? theme.palette.common.lightGrey : 'inherit',
            },
          }}
          icon={
            <Badge color='error' variant='dot' invisible={disabled}>
              <MessageOutlinedIcon />
            </Badge>
          }
        />
      </BottomNavigation>
    </Paper>
  );
};
