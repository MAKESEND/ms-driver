import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StyleProvider } from './style-provider';
import { ModalProvider } from './modal-provider';
import { ToastProvider } from './toast-provider';

import dynamic from 'next/dynamic';
const RecoilRoot = dynamic(() =>
  import('recoil').then((mod) => mod.RecoilRoot)
);

const CoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StyleProvider>
          <ModalProvider>
            <ToastProvider>{children}</ToastProvider>
          </ModalProvider>
        </StyleProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default CoreProvider;
