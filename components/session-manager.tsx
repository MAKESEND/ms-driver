import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';

import PageLoader from '~/components/common/loader/page-loader';

import { inAppLinks, InAppLinks } from '~/constants/side-nav-links';

const dashboardHref = inAppLinks[InAppLinks.DASHBOARD]?.href!;
const authHref = inAppLinks[InAppLinks.AUTH]?.href;
const loginHref = inAppLinks[InAppLinks.AUTH]?.nested?.[InAppLinks.LOGIN]?.href;
const loginPath = `${authHref}${loginHref}`;
const pathCheck = new RegExp(loginPath);

const SessionManager: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const initRef = useRef<boolean>(false);

  const isLoading = session.status === 'loading';
  const isAuthenticated = session.status === 'authenticated';

  const isOnPublicPath = pathCheck.test(router.asPath);
  const shouldRedirectToLogin =
    !isAuthenticated && !isOnPublicPath && !isLoading;
  const shouldRedirectInApp = isAuthenticated && isOnPublicPath && !isLoading;

  useEffect(() => {
    if (!initRef.current) {
      if (shouldRedirectToLogin) {
        router.replace({ pathname: loginPath, query: { from: router.asPath } });
      } else if (shouldRedirectInApp) {
        router.replace({ pathname: dashboardHref });
      }
      initRef.current = true;
    }
  }, [isOnPublicPath, shouldRedirectInApp, shouldRedirectToLogin, router]);

  return (
    <PageLoader isLoading={isLoading}>
      <CircularProgress />
    </PageLoader>
  );
};

export default SessionManager;
