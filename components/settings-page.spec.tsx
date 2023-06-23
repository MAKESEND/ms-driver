import type { DeepMockProxy } from 'jest-mock-extended';
import { fireEvent, within } from '@testing-library/react';

import { customRender } from '~/test/test-utils';
import { Settings } from './settings-page';

import { useRouter, type NextRouter } from 'next/router';

describe('Settings Page', () => {
  const routerMock = useRouter() as DeepMockProxy<NextRouter>;

  test('should render default language as English', async () => {
    routerMock.locale = '';
    const { getByText } = customRender(<Settings />);

    const languageOption = getByText('English');

    expect(languageOption).toBeInTheDocument();
  });

  test('should change language', async () => {
    routerMock.locale = 'en';
    const targetLocale = 'zh';
    const { findByRole } = customRender(<Settings />);

    const select = await findByRole('button');
    fireEvent.mouseDown(select);
    const listbox = within(await findByRole('listbox'));
    fireEvent.click(listbox.getByText(/中文/i));

    expect(routerMock.replace).toBeCalledWith('/settings', routerMock.asPath, {
      locale: targetLocale,
    });
  });
});
