import { createContext, useReducer, useContext } from 'react';
import type { AlertProps } from '@mui/material';

import type { CallbackFunction } from '~/types';

export interface ToastProps extends AlertProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  severity?: AlertProps['severity'];
  onClose?: CallbackFunction;
  closeIn?: number; // milliseconds
}

export enum ToastActionTypes {
  OpenToast = 'OPEN_TOAST',
  CloseToast = 'CLOSE_TOAST',
}

export type ToastOpenAction = {
  type: ToastActionTypes.OpenToast;
  payload: ToastProps;
};

export type ToastCloseAction = {
  type: ToastActionTypes.CloseToast;
  payload?: never;
};

export type ToastState = {
  show: boolean;
  closeIn: number; // milliseconds
  toastProps: ToastProps | null;
};

export type ToastActions = ToastOpenAction | ToastCloseAction;

export const ToastContext = createContext<{
  state: ToastState;
  dispatch: React.Dispatch<ToastActions>;
} | null>(null);

const toastDefaultState: ToastState = {
  show: false,
  closeIn: 1500,
  toastProps: null,
};

export const reducer = (state: ToastState, { type, payload }: ToastActions) => {
  switch (type) {
    case ToastActionTypes.OpenToast:
      const { closeIn = toastDefaultState.closeIn, ...toastProps } = payload;
      return {
        ...state,
        show: true,
        closeIn: payload.closeIn ?? 0,
        toastProps: toastProps,
      };
    case ToastActionTypes.CloseToast:
      return {
        ...state,
        show: false,
        closeIn: toastDefaultState.closeIn,
        toastProps: null,
      };
    default:
      return state;
  }
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, toastDefaultState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) throw new Error('useToast can only be used in ToastProvider');

  return ctx;
};
