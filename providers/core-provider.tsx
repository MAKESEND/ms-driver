import type { PropsWithChildren } from 'react';

import StyleProvider from './style-provider';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <StyleProvider>{children}</StyleProvider>;
};

export default CoreProvider;
