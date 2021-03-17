import { setupEnzyme } from '@codecademy/gamut-tests';

import { Select } from '../Select';

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

const renderWrapper = setupEnzyme(Select, {
  options: selectOptionsObject,
  id: 'colors',
});

describe('Select', () => {
  it('sets the id prop on the select tag', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find('SelectBase').props().id).toBe(defaultProps.id);
  });

  it('renders the same number of option as options', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('SelectBase').props().children).toHaveLength(
      defaultProps.options.length
    );
  });

  it('sets the key of option tags using the form of `${id}-${value} when the prop id is passed`', () => {
    const { wrapper } = renderWrapper();

    const keyWithId = `${defaultProps.id}-${selectOptions[0]}`;

    const getByTestId = wrapper.find(`option[data-testid="${keyWithId}"]`);

    expect(getByTestId.exists()).toBe(true);
  });

  it('renders options when options is an object', () => {
    const { wrapper } = renderWrapper();

    const keyWithId = `${defaultProps.id}-${selectOptions[0]}`;

    const getByTestId = wrapper.find(`option[data-testid="${keyWithId}"]`);

    expect(getByTestId.exists()).toBe(true);
  });
});
