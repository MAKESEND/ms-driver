import { act } from '@testing-library/react';

import { customRender } from '~/test/test-utils';
import RouteLoader from './route-loader';

jest.mock('~/components/common/loader/page-loader', () => ({
  PageLoader: ({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div data-testid='loading' /> : <div data-testid='idle' />,
}));

import { useRouter } from 'next/router';
const useRouterMock = useRouter as jest.Mock;

describe('RouterLoader', () => {
  let changeStart: any = null;
  let changeComplete: any = null;
  const onMock = jest.fn((eventName, handler) => {
    if (eventName === 'routeChangeStart') {
      changeStart = handler; // Store the handler function
    }
    if (eventName === 'routeChangeComplete') {
      changeComplete = handler; // Store the handler function
    }
  });
  useRouterMock.mockReturnValue({
    events: { on: onMock, off: jest.fn() },
  });

  test('should on load event handler', () => {
    customRender(<RouteLoader />);

    expect(onMock).toBeCalledTimes(3);
  });

  test('should switch on loader', async () => {
    const { findByTestId } = customRender(<RouteLoader />);

    act(() => {
      changeStart();
    });

    expect(await findByTestId('loading')).toBeInTheDocument();

    act(() => {
      changeComplete();
    });

    expect(await findByTestId('idle')).toBeInTheDocument();
  });
});
