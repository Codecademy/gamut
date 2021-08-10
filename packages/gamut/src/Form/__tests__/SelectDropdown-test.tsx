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

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
      button: 0,
    });

    const dropdown = wrapper.find('Control');
    const options = wrapper.find('Option');
    expect(dropdown.getDOMNode()).toHaveStyle('height : 2rem');
    expect(options.first().getDOMNode()).toHaveStyle('padding : 3px 14px');
  });

  it.only('renders a dropdown with the correct maxHeight when shownOptions is specified', () => {
    const { wrapper } = renderWrapper({
      options: selectOptionsObject,
    });

    wrapper.find('DropdownIndicator').first().simulate('mouseDown', {
      button: 0,
    });

    const menuList = wrapper.find('MenuList');
    expect(menuList.getDOMNode()).toHaveStyle('max-height : 18rem');
  });
});
