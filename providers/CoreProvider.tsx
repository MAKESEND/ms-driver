import type { PropsWithChildren } from 'react';

import StyleProvider from './StyleProvider';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <StyleProvider>{children}</StyleProvider>;
};

export default CoreProvider;
