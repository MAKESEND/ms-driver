import { Alert, AlertTitle, Collapse } from '@mui/material';

import { useToast, ToastActionTypes } from '~/providers/toast-provider';

export const Toast: React.FC = () => {
  const { state, dispatch } = useToast();

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
      <Alert {...state.toastProps} onClose={onClose}>
        {Title}
        {Body}
      </Alert>
    </Collapse>
  );
};
