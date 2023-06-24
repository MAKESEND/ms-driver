import { mockFn } from 'jest-mock-extended';
import { customRender } from '~/test/test-utils';
import { OnlineIndicator } from './online-indicator';

jest.mock('react-use', () => ({
  useNetworkState: mockFn().mockReturnValue(jest.fn()),
}));
import { useNetworkState } from 'react-use';
const useNetworkStateMock = useNetworkState as jest.Mock;

describe('OnlineIndicator', () => {
  test('should be switched on', async () => {
    useNetworkStateMock.mockReturnValue({ online: false, previous: false });
    const { rerender, findByText } = customRender(<OnlineIndicator />);

    useNetworkStateMock.mockReturnValue({ online: true, previous: false });
    rerender(<OnlineIndicator />);

    expect(await findByText('hint.online')).toBeInTheDocument();
  });

  test('should be switched off', async () => {
    useNetworkStateMock.mockReturnValue({ online: true, previous: true });
    const { rerender, findByText } = customRender(<OnlineIndicator />);

    useNetworkStateMock.mockReturnValue({ online: false, previous: true });
    rerender(<OnlineIndicator />);

    expect(await findByText('hint.offline')).toBeInTheDocument();
  });
});
