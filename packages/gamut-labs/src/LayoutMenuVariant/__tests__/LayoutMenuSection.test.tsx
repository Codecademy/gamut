import { setupRtl } from '@codecademy/gamut-tests';

import { LayoutMenuSection } from '../LayoutMenuSection';

const sectionItemOnClick = jest.fn();

const renderView = setupRtl(LayoutMenuSection, {
  items: [
    {
      title: `It's showtime!`,
      slug: 'beetlejuice-beetlejuice-beetlejuice',
      href: '',
      onClick: sectionItemOnClick,
    },
    {
      title: 'I myself am strange and unusual',
      slug: 'lydia-deetz',
      href: '',
      onClick: sectionItemOnClick,
    },
  ],
  onItemClick: jest.fn(),
});

describe('TopLinkSection', () => {
  it('renders all links appropriately', () => {
    const { view, props } = renderView();
    props.items.map((section) => view.getByText(section.title));
  });
});
