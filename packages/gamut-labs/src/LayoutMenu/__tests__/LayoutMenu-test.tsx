import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { LayoutMenu } from '../LayoutMenu';

const renderView = setupRtl(LayoutMenu, {
  sections: [
    {
      title: 'main test title',
      slug: 'test-slug',
      items: [
        {
          title: 'sub title',
          slug: 'sub-slug',
        },
      ],
    },
  ],
  onSectionToggle: jest.fn(),
  onSectionItemClick: jest.fn(),
  mobileButtonText: 'test button',
});

describe('LayoutMenu', () => {
  it('renders Codecademy logo when showLogoOnFlyout is true', () => {
    const { view } = renderView({ showLogoOnFlyout: true });
    fireEvent.click(view.getByText('test button'));
    view.getByTitle('Codecademy Logo');
  });

  it('does not render Codecademy logo when showLogoOnFlyout is false', () => {
    const { view } = renderView();
    fireEvent.click(view.getByText('test button'));
    expect(view.queryByTitle('Codecademy Logo')).toBe(null);
  });
});
