import { customRender } from '~/test/test-utils';
import type { mockFn } from 'jest-mock-extended';

import SortingPage, { getStaticProps } from './sorting';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const serverSideTranslationsMock = serverSideTranslations as ReturnType<
  typeof mockFn
>;

const sortingPageTestId = 'sortingPageTestId';
jest.mock('~/components/sorting/sorting-page', () => ({
  Sorting: () => <div data-testid={sortingPageTestId} />,
}));

describe('Sorting Page', () => {
  test('should render properly', async () => {
    const { findByTestId } = customRender(<SortingPage />);

    expect(await findByTestId(sortingPageTestId)).toBeInTheDocument();
  });

  test('should call getStaticProps', () => {
    const locale = 'en';

    getStaticProps({ locale } as any);

    expect(serverSideTranslationsMock).toBeCalledWith(locale, [
      'common',
      'parcel',
      'sorting',
    ]);
  });

  test('should render child node in layout', async () => {
    if (!SortingPage.getLayout) return null;
    const childNode = <div data-testid='testId' />;

    const element = SortingPage.getLayout(childNode) as any;

    expect(element.props.children).toEqual(childNode);
  });
});
