import type { PropsWithChildren } from 'react';

import StyleProvider from './style-provider';
import RouteLoader from '~/components/common/loader/route-loader';

const CoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider>
      <RouteLoader>{children}</RouteLoader>
    </StyleProvider>
  );
};

export default CoreProvider;
