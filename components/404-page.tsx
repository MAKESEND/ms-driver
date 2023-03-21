import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button, Stack, Typography } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';

export const NotFoundPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  const message = '404 Not Found';
  const btnText = 'Go Dashboard';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(inAppLinks.login?.href!);
    }
  }, [router, status]);

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
