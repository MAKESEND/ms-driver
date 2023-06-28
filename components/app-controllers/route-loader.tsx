import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { preRouteState } from '~/store/pre-route';
import { PageLoader } from '~/components/common/loader/page-loader';

export const RouteLoader: React.FC = () => {
  const { asPath, query, pathname, events } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setPreRoute = useSetRecoilState(preRouteState);

  useEffect(() => {
    const changeStart = () => {
      setIsLoading(true);
      setPreRoute({ asPath, query, pathname });
    };
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
  }, [events, asPath, query, pathname, setPreRoute]);

  return <PageLoader isLoading={isLoading} />;
};

export default RouteLoader;
