import { Fade, Typography } from '@mui/material';
import type { ControllerFieldState } from 'react-hook-form';

import dynamic from 'next/dynamic';
const ErrorIcon = dynamic(
  () => import('@mui/icons-material/ReportGmailerrorredOutlined')
);

export interface InputAlertProps {
  inputState: ControllerFieldState;
}

export const InputAlert: React.FC<React.PropsWithChildren<InputAlertProps>> = ({
  children,
  inputState,
}) => {
  return (
    <Fade in={inputState.invalid}>
      <Typography
        sx={{
          px: 1,
          width: '100%',
          display: 'inline-flex',
          gap: 1,
          alignItems: 'center',
          maxWidth: (theme) => theme.layout.size.btnMaxWidth,
        }}
      >
        <ErrorIcon color='error' />
        <Typography
          component='span'
          color='error'
          sx={{
            flexGrow: 1,
            textAlign: 'start',
            fontSize: '0.75rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {inputState.error?.message}
          {children}
        </Typography>
      </Typography>
    </Fade>
  );
};

export default InputAlert;
