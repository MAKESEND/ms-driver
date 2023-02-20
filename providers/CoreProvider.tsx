import type { PropsWithChildren } from 'react';

import StyleProvider from './StyleProvider';
import RouteLoader from '~/components/common/loader/RouteLoader';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider>
      <RouteLoader>{children}</RouteLoader>
    </StyleProvider>
  );
};

export default CoreProvider;
