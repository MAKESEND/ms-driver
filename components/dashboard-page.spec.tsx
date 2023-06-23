import { customRender } from '~/test/test-utils';
import { Dashboard } from './dashboard-page';

import { inAppImages } from '~/constants/image-list';

describe('Dashboard Page', () => {
  test('should render correctly', async () => {
    const { findByRole } = customRender(<Dashboard />);
    const image = await findByRole('img');

    expect(image).toHaveAttribute('alt', inAppImages.MSLogo.alt);
  });
});
