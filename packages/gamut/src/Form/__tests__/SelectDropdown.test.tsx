import {
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
} from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { fireEvent, queryByAttribute } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';

import { SelectDropdown } from '../SelectDropdown';

expect.extend(matchers);

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

    expect(view.getByText('green'));
  });

  it('renders a small dropdown when size is "small"', () => {
    const { view } = renderView({ size: 'small' });
    expect(view.getByTitle('Mini Chevron Down Icon'));
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { view } = renderView({ size: 'medium' });
    expect(view.getByTitle('Arrow Chevron Down Icon'));
  });

  it('renders a medium dropdown by default', () => {
    const { view } = renderView();
    expect(view.getByTitle('Arrow Chevron Down Icon'));
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
      fireEvent.click(view.getByText('red'));
      openDropdown(view);
      fireEvent.click(view.getByText('green'));
    });

    selectOptions
      .slice(0, numSelectedItems)
      .forEach((value) => expect(view.getByText(value)));
  });
});
