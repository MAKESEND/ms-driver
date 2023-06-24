import { StyleProvider } from './style-provider';
import { ModalProvider } from './modal-provider';
import { ToastProvider } from './toast-provider';

import dynamic from 'next/dynamic';
const RecoilRoot = dynamic(() =>
  import('recoil').then((mod) => mod.RecoilRoot)
);

const CoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <StyleProvider>
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </StyleProvider>
    </RecoilRoot>
  );
};

export default CoreProvider;
