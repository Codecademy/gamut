import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { LayoutMenu } from '../LayoutMenu';

const renderView = setupRtl(LayoutMenu, {
  sections: [
    {
      title: 'main test title1',
      slug: 'test-slug1',
      items: [
        {
          title: 'sub title1',
          slug: 'sub-slug1',
          href: '',
          onClick: jest.fn(),
        },
      ],
    },
    {
      title: 'main test title2',
      slug: 'test-slug2',
      items: [
        {
          title: 'sub title2',
          slug: 'sub-slug2',
          href: '',
          onClick: jest.fn(),
        },
      ],
    },
  ],
  onSectionToggle: jest.fn(),
  mobileButtonText: 'test button',
});

describe('LayoutMenu', () => {
  it('renders all sections appropriately', () => {
    const { view, props } = renderView();
    props.sections.map((section) => view.getByText(section.title));
  });

  it('renders Codecademy logo in flyout', () => {
    const { view } = renderView();
    fireEvent.click(view.getByText('test button'));
    view.getByTitle('Codecademy Logo');
  });
});
