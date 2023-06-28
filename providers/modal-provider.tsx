import { useReducer, useContext, createContext } from 'react';
import type { ModalProps as MuiModalProps } from '@mui/material';

import type { CallbackFunction } from '~/types';

export enum ModalActionTypes {
  OpenModal = 'OPEN_MODAL',
  CloseModal = 'CLOSE_MODAL',
}

export interface ModalProps extends Partial<MuiModalProps> {
  header?: React.ReactNode;
  canEscape?: boolean;
  content?: React.ReactNode;
  onCancel?: CallbackFunction;
  cancelBtn?: string | React.FC<Required<React.PropsWithOnClickCallback>>;
  onConfirm?: CallbackFunction;
  confirmBtn?: string | React.FC<Required<React.PropsWithOnClickCallback>>;
}

export type ModalState = {
  show: boolean;
  modalProps: ModalProps | null;
};

const modalDefaultState: ModalState = {
  show: false,
  modalProps: null,
};

export type ModalShowAction = {
  type: ModalActionTypes.OpenModal;
  payload: ModalProps;
};

export type ModalHideAction = {
  type: ModalActionTypes.CloseModal;
  payload?: never;
};

export type ModalActions = ModalShowAction | ModalHideAction;

const reducer = (state: ModalState, { type, payload }: ModalActions) => {
  switch (type) {
    case ModalActionTypes.OpenModal:
      return { ...state, show: true, modalProps: payload };
    case ModalActionTypes.CloseModal:
      return { ...modalDefaultState };
    default:
      throw new Error('invalid modal action');
  }
};

const ModalContext = createContext<{
  state: ModalState;
  dispatch: React.Dispatch<ModalActions>;
} | null>(null);

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, modalDefaultState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error('useModal can only be used in ModalProvider');
  }

  return ctx;
};
