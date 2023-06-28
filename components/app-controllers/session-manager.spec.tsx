import { DeepMockProxy } from 'jest-mock-extended';

import { customRender } from '~/test/test-utils';
import { SessionManager } from './session-manager';
import { inAppLinks } from '~/constants/side-nav-links';

import { useSession } from 'next-auth/react';
import { useRouter, type NextRouter } from 'next/router';

describe('SessionManager', () => {
  const useRouterMock = useRouter as jest.Mock;
  const sessionMock = useSession() as DeepMockProxy<
    ReturnType<typeof useSession>
  >;
  const dashboardHref = inAppLinks.dashboard?.href!;
  const settingsHref = inAppLinks.settings?.href!;
  const loginPath = `${inAppLinks.auth?.href}${inAppLinks.auth?.nested?.login?.href}`;

  test('should redirect to login page', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockReturnValue({
      asPath: dashboardHref,
      replace: replaceMock,
    });
    sessionMock.status = 'unauthenticated';
    // routerMock.asPath = dashboardHref;

    customRender(<SessionManager />);

    expect(replaceMock).toBeCalledWith({
      pathname: loginPath,
      query: { from: dashboardHref },
    });
  });

  describe('should redirect after user is authenticated', () => {
    const replaceMock = jest.fn();

    beforeAll(() => {
      sessionMock.status = 'authenticated';
    });

    test('should redirect to dashboard', async () => {
      useRouterMock.mockReturnValue({
        asPath: loginPath,
        replace: replaceMock,
        query: {
          from: '',
        },
      });

      customRender(<SessionManager />);

      expect(replaceMock).toBeCalledWith({
        pathname: dashboardHref,
      });
    });

    test('should redirect to where user was', async () => {
      useRouterMock.mockReturnValue({
        asPath: loginPath,
        replace: replaceMock,
        query: {
          from: settingsHref,
        },
      });

      customRender(<SessionManager />);

      expect(replaceMock).toBeCalledWith({
        pathname: settingsHref,
      });
    });
  });
});
