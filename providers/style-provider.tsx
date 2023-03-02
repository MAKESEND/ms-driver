import type { PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from '~/styles/theme';

export const StyleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
