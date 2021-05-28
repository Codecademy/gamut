import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { AccordionMenu } from '../AccordionMenu';

const renderView = setupRtl(AccordionMenu, {
  section: {
    title: 'main title',
    slug: 'test-slug',
    items: [
      {
        title: 'item title',
        slug: 'item-slug',
      },
    ],
  },
  onSectionToggle: jest.fn(),
  onSectionItemClick: jest.fn(),
});

describe('AccordionMenu', () => {
  it('calls onSectionToggle when accordion button is clicked', () => {
    const { view, props } = renderView();
    fireEvent.click(view.getByText('main title'));
    expect(props.onSectionToggle).toBeCalledTimes(1);
  });

  it('renders item as text when it is the selected item', () => {
    const { view, props } = renderView({ selectedItem: 'item-slug' });
    const text = view.getByText('item title');
    fireEvent.click(text);
    expect(props.onSectionItemClick).toBeCalledTimes(0);
  });

  it('renders item as link when it is not the selected item', () => {
    const { view, props } = renderView();
    fireEvent.click(view.getByText('item title'));
    expect(props.onSectionItemClick).toBeCalledTimes(1);
  });
});
