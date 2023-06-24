import { render } from '@testing-library/react';
import { AppControllers } from './controllers';

const modalTestId = 'modalTestId';
jest.mock('~/components/common/modal/generic-modal', () => ({
  Modal: () => <div data-testid={modalTestId} />,
}));
const toastTestId = 'toastTestId';
jest.mock('~/components/common/toast/generic-toast', () => ({
  Toast: () => <div data-testid={toastTestId} />,
}));
const onlineIndicatorTestId = 'onlineIndicatorTestId';
jest.mock('~/components/app-controllers/online-indicator', () => ({
  OnlineIndicator: () => <div data-testid={onlineIndicatorTestId} />,
}));
const routeLoaderTestId = 'routeLoaderTestId';
jest.mock('~/components/app-controllers/route-loader', () => ({
  RouteLoader: () => <div data-testid={routeLoaderTestId} />,
}));
const sessionManagerTestId = 'sessionManagerTestId';
jest.mock('~/components/app-controllers/session-manager', () => ({
  SessionManager: () => <div data-testid={sessionManagerTestId} />,
}));

describe('AppControllers', () => {
  test('should render correctly', async () => {
    const { findByTestId } = render(<AppControllers />);

    expect(await findByTestId(modalTestId)).toBeInTheDocument();
    expect(await findByTestId(toastTestId)).toBeInTheDocument();
    expect(await findByTestId(onlineIndicatorTestId)).toBeInTheDocument();
    expect(await findByTestId(routeLoaderTestId)).toBeInTheDocument();
    expect(await findByTestId(sessionManagerTestId)).toBeInTheDocument();
  });
});
