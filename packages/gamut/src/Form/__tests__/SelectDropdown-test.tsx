import {
  ArrowChevronDownIcon,
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { setupEnzyme } from '@codecademy/gamut-tests';
import { ReactWrapper } from 'enzyme';

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

const renderWrapper = setupEnzyme(SelectDropdown, {
  options: selectOptions,
  id: 'colors',
});

const openDropdown = (wrapper: ReactWrapper) =>
  wrapper.find('DropdownIndicator').simulate('mouseDown', {
    button: 0,
  });

describe('SelectDropdown', () => {
  it('sets the id prop on the select tag', () => {
    const { wrapper, props } = renderWrapper();
    expect(wrapper.find(SelectDropdown).props().id).toBe(props.id);
  });

  it('renders the same number of options as options', () => {
    const { wrapper } = renderWrapper();

    openDropdown(wrapper);

    expect(wrapper.find('Option')).toHaveLength(3);
  });

  it.each([
    ['array', selectOptions],
    ['object', selectOptionsObject],
  ])('renders options when options is an %s', (_, options) => {
    const { wrapper } = renderWrapper({ options });

    openDropdown(wrapper);

    const getByLabel = wrapper.find(`[label="green"]`);

    expect(getByLabel.exists()).toBe(true);
  });

  it('renders a small dropdown when size is "small"', () => {
    const { wrapper } = renderWrapper({ size: 'small' });
    expect(wrapper.exists(MiniChevronDownIcon)).toBe(true);
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { wrapper } = renderWrapper({ size: 'medium' });
    expect(wrapper.exists(ArrowChevronDownIcon)).toBe(true);
  });

  it('renders a medium dropdown by default', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.exists(ArrowChevronDownIcon)).toBe(true);
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', () => {
    const { wrapper } = renderWrapper({ shownOptionsLimit: 4 });

    openDropdown(wrapper);

    const menuList = wrapper.find('MenuList');
    expect(menuList.getDOMNode()).toHaveStyle('max-height : 12rem');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified + size is "small"', () => {
    const { wrapper } = renderWrapper({
      shownOptionsLimit: 4,
      size: 'small',
    });

    openDropdown(wrapper);

    const menuList = wrapper.find('MenuList');
    expect(menuList.getDOMNode()).toHaveStyle('max-height : 8rem');
  });

  it('renders a dropdown with icons', () => {
    const { wrapper } = renderWrapper({ options: optionsIconsArray });

    openDropdown(wrapper);

    optionsIconsArray.forEach(({ icon }) =>
      expect(wrapper.exists(icon)).toBe(true)
    );
  });

  it('function passed to onInputChanges is called on input change', () => {
    const onInputChange = jest.fn();
    const { wrapper } = renderWrapper({ onInputChange });

    openDropdown(wrapper);
    wrapper.find('Option').first().simulate('click');

    expect(onInputChange).toHaveBeenCalled();
  });
});
