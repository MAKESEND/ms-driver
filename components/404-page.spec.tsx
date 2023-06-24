import { customRender } from '~/test/test-utils';
import NotFoundPage from './404-page';
import { inAppLinks } from '~/constants/side-nav-links';

describe('Not Found Page', () => {
  test('should render correctly', async () => {
    const { findByRole } = customRender(<NotFoundPage />);

    const link = await findByRole('link');

    expect(link).toHaveAttribute('href', inAppLinks.dashboard?.href);
  });
});
