import { Stack } from '@mui/material';

import { FlexFullHeightLayout } from '~/components/layouts/flex-full-height-layout';

export const ScannerLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <FlexFullHeightLayout>
      <Stack
        sx={{
          px: 2,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: (theme) => theme.layout.size.portMaxWidth,
        }}
      >
        {children}
      </Stack>
    </FlexFullHeightLayout>
  );
};
