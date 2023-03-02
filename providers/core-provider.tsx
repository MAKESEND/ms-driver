import type { PropsWithChildren } from 'react';

import { StyleProvider } from './style-provider';
import { ModalProvider } from './modal-provider';
import { ToastProvider } from './toast-provider';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider>
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </StyleProvider>
  );
};

export default CoreProvider;
