import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PageLoader from './page-loader';

export const RouteLoader: React.FC<React.PropsWithChildren> = () => {
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

  return <PageLoader isLoading={isLoading} />;
};

export default RouteLoader;
