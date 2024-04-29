import {
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
} from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queryByAttribute } from '@testing-library/dom';

import { SelectDropdown } from '../SelectDropdown';

const selectOptions = ['red', 'yellow', 'green'];

const selectOptionsObject = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  teal: 'teal',
  orange: 'orange',
};

const optionsIconsArray = [
  {
    label: 'Data Transfer Vertical Icon',
    value: 'one',
    icon: DataTransferVerticalIcon,
  },
  { label: 'Calendar Icon', value: 'two', icon: CalendarIcon },
  { label: 'Earth Icon', value: 'three', icon: EarthIcon },
];

jest.mock('@codecademy/gamut-icons', () => ({
  ...jest.requireActual<{}>('@codecademy/gamut-icons'),
  MiniChevronDownIcon: () => (
    <svg>
      <title>Mini Chevron Down Icon</title>
    </svg>
  ),
  ArrowChevronDownIcon: () => (
    <svg>
      <title>Arrow Chevron Down Icon</title>
    </svg>
  ),
  DataTransferVerticalIcon: () => (
    <svg>
      <title>Data Transfer Vertical Icon</title>
    </svg>
  ),
  CalendarIcon: () => (
    <svg>
      <title>Calendar Icon</title>
    </svg>
  ),
  EarthIcon: () => (
    <svg>
      <title>Earth Icon</title>
    </svg>
  ),
}));

const renderView = setupRtl(SelectDropdown, {
  options: selectOptions,
  name: 'colors',
});

const DOWN_ARROW = { keyCode: 40 };

const openDropdown = (view: ReturnType<typeof renderView>['view']) =>
  fireEvent.keyDown(view.getByRole('combobox'), DOWN_ARROW);

const getById = queryByAttribute.bind(null, 'id');

const getMenuList = (view: ReturnType<typeof renderView>['view']) =>
  getById(view.container, /listbox/)?.firstChild;

describe('SelectDropdown', () => {
  it('sets the id prop on the select tag', () => {
    const { view } = renderView();

    expect(view.getByRole('combobox')).toHaveAttribute('id', 'colors');
  });

  it.each([
    ['array', selectOptions],
    ['object', selectOptionsObject],
  ])('renders options when options is an %s', (_, options) => {
    const { view } = renderView({ options });

    openDropdown(view);

    view.getByText('green');
  });

  it('renders a small dropdown when size is "small"', () => {
    const { view } = renderView({ size: 'small' });
    view.getByTitle('Mini Chevron Down Icon');
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { view } = renderView({ size: 'medium' });
    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('renders a medium dropdown by default', () => {
    const { view } = renderView();
    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', () => {
    const { view } = renderView({ shownOptionsLimit: 4 });

    openDropdown(view);

    const menuList = getMenuList(view);

    expect(menuList).toHaveStyle({ maxHeight: '12rem' });
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified + size is "small"', () => {
    const { view } = renderView({
      size: 'small',
      shownOptionsLimit: 4,
    });

    openDropdown(view);

    const menuList = getMenuList(view);

    expect(menuList).toHaveStyle({ maxHeight: '8rem' });
  });

  it('renders a dropdown with icons', () => {
    const { view } = renderView({ options: optionsIconsArray });

    openDropdown(view);

    optionsIconsArray.forEach((icon) => expect(view.getByTitle(icon.label)));
  });

  it('function passed to onInputChanges is called on input change', () => {
    const onInputChange = jest.fn();
    const { view } = renderView({ onInputChange });

    openDropdown(view);

    fireEvent.click(view.getByText('red'));

    expect(onInputChange).toHaveBeenCalled();
  });

  it('renders selected & multiple items when passed multiple: true', () => {
    const { view } = renderView({ multiple: true });

    const numSelectedItems = 2;

    [...Array(numSelectedItems)].forEach(() => {
      openDropdown(view);
      // fireEvent.click(view.getByText('red'));
      // openDropdown(view);
      fireEvent.click(view.getByText('green'));
    });

    selectOptions
      .slice(0, numSelectedItems)
      .forEach((value) => view.getByText(value));
  });
});
