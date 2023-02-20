import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Fade } from '@mui/material';

import PageLoader from './PageLoader';

export const RouteLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { events } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const changeStart = () => setIsLoading(true);
    const changeComplete = () => setIsLoading(false);

    events.on('routeChangeStart', changeStart);
    events.on('routeChangeComplete', changeComplete);
    events.on('routeChangeError', changeComplete);

    return () => {
      events.off('routeChangeStart', changeStart);
      events.off('routeChangeComplete', changeComplete);
      events.off('routeChangeError', changeComplete);
      setIsLoading(false);
    };
  }, [events]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Fade in>
        <Box>{children}</Box>
      </Fade>
    </>
  );
};

export default RouteLoader;
