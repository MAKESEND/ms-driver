import { fireEvent, within } from '@testing-library/react';
import { useRouter } from 'next/router';

import { customRender } from '~/test/test-utils';
import { Settings } from './settings-page';

const useRouterMock = useRouter as jest.Mock;

describe('Settings Page', () => {
  const asPath = '/';

  test('should render default language as English', async () => {
    useRouterMock.mockReturnValue(() => ({
      locale: '',
      asPath,
      replace: jest.fn(),
    }));

    const { getByText } = customRender(<Settings />);

    const languageOption = getByText('English');

    expect(languageOption).toBeInTheDocument();
  });

  test('should change language', async () => {
    const replaceMock = jest.fn();
    useRouterMock.mockReturnValue({
      locale: 'en',
      asPath,
      replace: replaceMock,
    });
    const targetLocale = 'zh';
    const { findByRole } = customRender(<Settings />);

    const select = await findByRole('button');
    fireEvent.mouseDown(select);
    const listbox = within(await findByRole('listbox'));
    fireEvent.click(listbox.getByText(/中文/i));

    expect(replaceMock).toBeCalledWith('/settings', asPath, {
      locale: targetLocale,
    });
  });
});
