import {
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
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
  { label: 'first icon', value: 'one', Icon: DataTransferVerticalIcon },
  { label: 'second icon', value: 'two', Icon: CalendarIcon },
  { label: 'third icon', value: 'three', Icon: EarthIcon },
];

const renderWrapper = setupEnzyme(SelectDropdown, {
  options: selectOptions,
  id: 'colors',
});

describe('Select', () => {
  it('sets the id prop on the select tag', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find('SelectDropdown').props().id).toBe(defaultProps.id);
  });

  it('renders the same number of options as options', () => {
    const { wrapper } = renderWrapper();

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
      button: 0,
    });

    expect(wrapper.find('Option').length).toEqual(3);
  });

  it('renders options when options is an object', () => {
    const { wrapper } = renderWrapper({ options: selectOptionsObject });

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
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

    const dropdownIconTitle = wrapper.find('DropdownIndicator').text();
    expect(dropdownIconTitle).toEqual('Mini Chevron Down Icon');
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      size: 'medium',
    });

    const dropdownIconTitle = wrapper.find('DropdownIndicator').text();
    expect(dropdownIconTitle).toEqual('Arrow Chevron Down Icon');
  });

  it('renders a medium dropdown by default', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
    });

    const dropdownIconTitle = wrapper.find('DropdownIndicator').text();
    expect(dropdownIconTitle).toEqual('Arrow Chevron Down Icon');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
      shownOptionsLimit: 4,
    });

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
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

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
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

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
      button: 0,
    });

    const icon1 = wrapper.find(DataTransferVerticalIcon).text();
    const icon2 = wrapper.find(CalendarIcon).text();
    const icon3 = wrapper.find(EarthIcon).text();

    expect(icon1).toBe('Data Transfer Vertical Icon');
    expect(icon2).toBe('Calendar Icon');
    expect(icon3).toBe('Earth Icon');
  });
});
