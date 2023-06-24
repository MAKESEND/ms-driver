import { DeepMockProxy } from 'jest-mock-extended';

import { customRender } from '~/test/test-utils';
import { SessionManager } from './session-manager';
import { inAppLinks } from '~/constants/side-nav-links';

import { useSession } from 'next-auth/react';
import { useRouter, type NextRouter } from 'next/router';

describe('SessionManager', () => {
  const routerMock = useRouter() as DeepMockProxy<NextRouter>;
  const sessionMock = useSession() as DeepMockProxy<
    ReturnType<typeof useSession>
  >;
  const dashboardHref = inAppLinks.dashboard?.href!;
  const settingsHref = inAppLinks.settings?.href!;
  const loginPath = `${inAppLinks.auth?.href}${inAppLinks.auth?.nested?.login?.href}`;

  test('should redirect to login page', async () => {
    sessionMock.status = 'unauthenticated';
    routerMock.asPath = dashboardHref;

    customRender(<SessionManager />);

    expect(routerMock.replace).toBeCalledWith({
      pathname: loginPath,
      query: { from: routerMock.asPath },
    });
  });

  describe('should redirect after user is authenticated', () => {
    beforeAll(() => {
      sessionMock.status = 'authenticated';
      routerMock.asPath = loginPath;
    });

    test('should redirect to dashboard', async () => {
      routerMock.query.from = '';

      customRender(<SessionManager />);

      expect(routerMock.replace).toBeCalledWith({
        pathname: dashboardHref,
      });
    });

    test('should redirect to where user was', async () => {
      routerMock.query.from = settingsHref;

      customRender(<SessionManager />);

      expect(routerMock.replace).toBeCalledWith({
        pathname: settingsHref,
      });
    });
  });
});
