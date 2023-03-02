import { useState, useEffect } from 'react';
import { useNetworkState } from 'react-use';
import { useTranslation } from 'next-i18next';
import { Alert, Snackbar } from '@mui/material';

import dynamic from 'next/dynamic';
const SignalWifiOffIcon = dynamic(
  () => import('@mui/icons-material/SignalWifiOff')
);
const SignalWifiIcon = dynamic(
  () => import('@mui/icons-material/SignalWifiStatusbar4Bar')
);

const autoHideDuration = 2000;

export const OnlineIndicator: React.FC = () => {
  const state = useNetworkState();
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation('common');
  const networkHint = t(`hint.${state.online ? 'online' : 'offline'}`);

  const severity = state.online ? 'success' : 'error';

  const onCloseAlert = () => setOpen(false);
  const onCloseSnackbar = () => state.online && setOpen(false);

  useEffect(() => {
    setOpen(
      () =>
        typeof state.previous === 'boolean' && state.online !== state.previous
    );
  }, [state]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        variant='outlined'
        onClose={onCloseAlert}
        severity={severity}
        iconMapping={{
          success: <SignalWifiIcon />,
          error: <SignalWifiOffIcon />,
        }}
      >
        {networkHint}
      </Alert>
    </Snackbar>
  );
};

export default OnlineIndicator;
