import { Grid, Stack } from '@mui/material';

import { ConfigKeys } from '~/providers/scanner-provider';

import { ScannerConfigSelect } from './scanner-config-select';
import { CameraSelect } from './camera-select';

export const ScannerConfig: React.FC = () => {
  return (
    <Stack gap={2} sx={{ width: '100%', my: 1 }}>
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={6} sx={{ pr: 1 }}>
          <ScannerConfigSelect configType={ConfigKeys.Task} />
        </Grid>
        <Grid item xs={6} sx={{ pl: 1 }}>
          <ScannerConfigSelect configType={ConfigKeys.Mode} />
        </Grid>
      </Grid>
      <CameraSelect />
    </Stack>
  );
};

export default ScannerConfig;
