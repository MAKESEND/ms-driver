import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import PageLoader from '~/components/common/loader/page-loader';

// TODO: improve routes with curry pattern
const dashboardHref = inAppLinks.dashboard?.href!;
const authHref = inAppLinks.auth?.href;
const loginHref = inAppLinks.auth?.nested?.login?.href;
const loginPath = `${authHref}${loginHref}`;

// TODO: improve ways to validate path check
const pathCheck = new RegExp(loginPath);

export const SessionManager: React.FC = () => {
  const router = useRouter();
  const session = useSession();

  const isLoading = session.status === 'loading';
  const isAuthenticated = session.status === 'authenticated';

  const isOnPublicPath = pathCheck.test(router.asPath);
  const shouldRedirectToLogin =
    !isAuthenticated && !isOnPublicPath && !isLoading;
  const shouldRedirectInApp = isAuthenticated && isOnPublicPath && !isLoading;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.replace({ pathname: loginPath, query: { from: router.asPath } });
    } else if (shouldRedirectInApp) {
      router.replace({
        pathname: (router.query.from || dashboardHref) as string,
      });
    }
  }, [isOnPublicPath, shouldRedirectInApp, shouldRedirectToLogin, router]);

  return (
    <PageLoader isLoading={isLoading}>
      <CircularProgress />
    </PageLoader>
  );
};
