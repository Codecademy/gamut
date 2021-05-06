import { setupEnzyme } from '@codecademy/gamut-tests';

import { Select } from '../Select';

const selectOptions = ['red', 'yellow', 'green'];
const defaultProps = {
  options: selectOptions,
  id: 'colors',
};

const selectOptionsObject = {
  redKey: 'red',
  greenKey: 'green',
  yellowKey: 'yellow',
};

const renderWrapper = setupEnzyme(Select, {
  options: selectOptions,
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

  it('renders options as an object with the correct label + value', () => {
    const { wrapper } = renderWrapper({ options: selectOptionsObject });

    const getByValue = wrapper.find(`[value="yellowKey"]`);
    const getFirstOption = wrapper.find('option').first();

    expect(getByValue.exists()).toBe(true);
    expect(getFirstOption.text()).toBe('red');
  });
});
