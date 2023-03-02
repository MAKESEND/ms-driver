import type { PropsWithChildren } from 'react';

import { StyleProvider } from './style-provider';
import { ModalProvider } from './modal-provider';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider>
      <ModalProvider>{children}</ModalProvider>
    </StyleProvider>
  );
};

export default CoreProvider;
