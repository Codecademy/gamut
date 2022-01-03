import {
  ArrowChevronDownIcon,
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  { label: 'first icon', value: 'one', icon: DataTransferVerticalIcon },
  { label: 'second icon', value: 'two', icon: CalendarIcon },
  { label: 'third icon', value: 'three', icon: EarthIcon },
];

const renderView = setupRtl(SelectDropdown, {
  options: selectOptions,
  id: 'colors',
});

const openDropdown = (view: RenderResult) => {
  userEvent.click(view.getByRole('textbox'));
};

describe('SelectDropdown', () => {
  it('sets the id prop on the select tag', () => {
    const { props, view } = renderView();

    expect(view.getByRole('combobox')).toHaveAttribute('id', props.id);
  });

  it('renders each of the options as options', () => {
    const { view } = renderView();

    openDropdown(view);

    for (const option of selectOptions) {
      view.getByText(option);
    }
  });

  it.each([
    ['array', selectOptions],
    ['object', selectOptionsObject],
  ])('renders options when options is an %s', (_, options) => {
    const { view } = renderView({ options });

    openDropdown(view);

    view.getByLabelText('green');
  });

  it('renders a small dropdown when size is "small"', () => {
    const { view } = renderView({ size: 'small' });

    view.getByTitle('Mini Chevron Down Icon');
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { view } = renderView({ size: 'medium' });

    view.getByTitle('Chevron Down Icon');
  });

  it('renders a medium dropdown by default', () => {
    const { view } = renderView();

    view.getByTitle('Chevron Down Icon');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', () => {
    const { view } = renderView({ shownOptionsLimit: 4 });

    openDropdown(view);

    expect(view.getByRole('combobox')).toHaveStyle({ 'max-height': '12rem' });
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified + size is "small"', () => {
    const { view } = renderView({
      shownOptionsLimit: 4,
      size: 'small',
    });

    openDropdown(view);

    expect(view.getByRole('combobox')).toHaveStyle({ 'max-height': '8rem' });
  });

  it('renders a dropdown with icons', () => {
    const { view } = renderView({ options: optionsIconsArray });

    openDropdown(view);

    optionsIconsArray.forEach(({ icon }) =>
      expect(wrapper.exists(icon)).toBe(true)
    );
  });

  it('function passed to onInputChanges is called on input change', () => {
    const onInputChange = jest.fn();
    const { view } = renderView({ onInputChange });

    openDropdown(view);
    wrapper.find('Option').first().simulate('click');

    expect(onInputChange).toHaveBeenCalled();
  });

  it('renders selected & multiple items when passed multiple: true', () => {
    const { view } = renderView({ multiple: true });

    const numSelectedItems = 2;

    [...Array(numSelectedItems)].forEach(() => {
      openDropdown(view);
      wrapper.find('Option').first().simulate('click');
    });

    selectOptions
      .slice(0, numSelectedItems)
      .forEach((value) => expect(wrapper.text().includes(value)).toBe(true));
  });
});
