import { useEffect, useRef } from 'react';
import { Alert, AlertTitle, Collapse } from '@mui/material';

import { useToast, ToastActionTypes } from '~/providers/toast-provider';

export const Toast: React.FC = () => {
  const { state, dispatch } = useToast();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (state.show && state.closeIn && !state.toastProps?.onClose) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: ToastActionTypes.CloseToast });
      }, state.closeIn);
    }
  }, [dispatch, state.closeIn, state.show, state.toastProps?.onClose]);

  const onClose =
    state.toastProps?.onClose ||
    (() => dispatch({ type: ToastActionTypes.CloseToast }));

  const Header = state.toastProps?.header;
  const Title =
    typeof Header === 'string' ? (
      <AlertTitle>{Header}</AlertTitle>
    ) : (
      Header && Header
    );

  const Content = state.toastProps?.content;
  const Body = typeof Content === 'string' ? Content : Content && Content;

  return (
    <Collapse
      in={state.show}
      sx={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Alert
        sx={{ alignItems: 'center' }}
        {...state.toastProps}
        onClose={onClose}
      >
        {Title}
        {Body}
      </Alert>
    </Collapse>
  );
};
