import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { AccordionMenu } from '../AccordionMenu';

const sectionItemOnClick = jest.fn();

const renderView = setupRtl(AccordionMenu, {
  section: {
    title: 'main title',
    slug: 'test-slug',
    items: [
      {
        title: 'item title',
        slug: 'item-slug',
        href: '',
        onClick: sectionItemOnClick,
      },
    ],
  },
  onSectionToggle: jest.fn(),
  onItemClick: jest.fn(),
});

describe('AccordionMenu', () => {
  it('calls onSectionToggle when accordion button is clicked', () => {
    const { view, props } = renderView();

    fireEvent.click(view.getByText('main title'));

    expect(props.onSectionToggle).toBeCalledTimes(1);
  });

  it('does not call onClick methods when it is the selected item', () => {
    const { view, props } = renderView({ selectedItem: 'item-slug' });

    fireEvent.click(view.getByText('item title'));

    expect(sectionItemOnClick).not.toBeCalled();
    expect(props.onItemClick).not.toBeCalled();
  });

  it('calls onClick methods when it is not the selected item', () => {
    const { view, props } = renderView();

    fireEvent.click(view.getByText('item title'));

    expect(sectionItemOnClick).toBeCalledTimes(1);
    expect(props.onItemClick).toBeCalledTimes(1);
  });
});
