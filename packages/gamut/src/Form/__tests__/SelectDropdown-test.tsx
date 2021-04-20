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

    const getByTestId = wrapper.find(`[label="green"]`);

    expect(getByTestId.exists()).toBe(true);
  });
});
