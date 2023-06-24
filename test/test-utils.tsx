import { render, type RenderOptions } from '@testing-library/react';

import CoreProvider from '~/providers/core-provider';

const AllProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <CoreProvider>{children}</CoreProvider>;
};

export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });
