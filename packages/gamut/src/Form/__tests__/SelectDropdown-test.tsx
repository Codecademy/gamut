import {
  ArrowChevronDownIcon,
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { setupEnzyme } from '@codecademy/gamut-tests';

import { SelectDropdown } from '../SelectDropdown';

const selectOptions = ['red', 'yellow', 'green'];

const defaultProps = {
  options: selectOptions,
  id: 'colors',
};

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

describe('SelectDropdown', () => {
  it('sets the id prop on the select tag', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find('SelectDropdown').props().id).toBe(defaultProps.id);
  });

  it('renders the same number of options as options', () => {
    const { wrapper } = renderWrapper();

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    expect(wrapper.find('Option').length).toEqual(3);
  });

  it('renders options when options is an array', () => {
    const { wrapper } = renderWrapper();

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    const getByLabel = wrapper.find(`[label="green"]`);

    expect(getByLabel.exists()).toBe(true);
  });

  it('renders options when options is an object', () => {
    const { wrapper } = renderWrapper({ options: selectOptionsObject });

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    const getByLabel = wrapper.find(`[label="green"]`);

    expect(getByLabel.exists()).toBe(true);
  });

  it('renders a small dropdown when size is "small"', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      size: 'small',
    });

    expect(wrapper.find(MiniChevronDownIcon)).toBeDefined();
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      size: 'medium',
    });

    expect(wrapper.find(ArrowChevronDownIcon)).toBeDefined();
  });

  it('renders a medium dropdown by default', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
    });

    expect(wrapper.find(ArrowChevronDownIcon)).toBeDefined();
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      shownOptionsLimit: 4,
    });

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    const menuList = wrapper.find('MenuList');
    expect(menuList.getDOMNode()).toHaveStyle('max-height : 12rem');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified + size is "small"', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      shownOptionsLimit: 4,
      size: 'small',
    });

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    const menuList = wrapper.find('MenuList');
    expect(menuList.getDOMNode()).toHaveStyle('max-height : 8rem');
  });

  it('renders a dropdown with icons', () => {
    const { wrapper } = renderWrapper({
      options: optionsIconsArray,
      size: 'small',
    });

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    expect(wrapper.find(DataTransferVerticalIcon)).toBeDefined();
    expect(wrapper.find(CalendarIcon)).toBeDefined();
    expect(wrapper.find(EarthIcon)).toBeDefined();
  });

  it('function passed to onInputChanges is called on input change', () => {
    const onInputChange = jest.fn();

    const { wrapper } = renderWrapper({
      options: optionsIconsArray,
      onInputChange,
    });

    wrapper.find('DropdownIndicator').simulate('mouseDown', {
      button: 0,
    });

    wrapper.find('Option').first().simulate('click');

    expect(onInputChange).toHaveBeenCalled();
  });
});
