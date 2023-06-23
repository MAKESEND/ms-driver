import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';

export const NotFoundPage: React.FC = () => {
  const message = '404 Not Found';
  const btnText = 'Go Dashboard';

  return (
    <Stack flexGrow={1} justifyContent='center' alignItems='center'>
      <Stack gap={2}>
        <Typography variant='h1'>{message}</Typography>
        <Link passHref legacyBehavior href={inAppLinks.dashboard?.href!}>
          <Button variant='contained' fullWidth>
            {btnText}
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default NotFoundPage;
