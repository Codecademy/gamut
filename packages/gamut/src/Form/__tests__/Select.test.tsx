import { setupRtl } from '@codecademy/gamut-tests';

import { Select } from '../inputs/Select';

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
const renderView = setupRtl(Select, {
  options: selectOptions,
  id: 'colors',
});

describe('Select', () => {
  it('sets the id prop on the select tag', () => {
    const { view } = renderView();

    expect(view.getByRole('combobox')).toHaveAttribute('id', 'colors');
  });

  it('renders the same number of options as options', () => {
    const { view } = renderView();

    expect(view.getAllByRole('option')).toHaveLength(3);
  });

  it('sets the key of option tags using the form of `${id}-${value}` when the prop id is passed', () => {
    const { view } = renderView();
    const keyWithId = `${defaultProps.id}-${selectOptions[0]}`;
    view.getByTestId(keyWithId);
  });

  it('renders options when options is an object', () => {
    const { view } = renderView({ options: selectOptionsObject });

    expect(view.getAllByRole('option')).toHaveLength(
      Object.keys(selectOptionsObject).length
    );
  });

  it('renders options as an object with the correct label + value', () => {
    const { view } = renderView({ options: selectOptionsObject });

    expect(view.getByRole('option', { name: 'yellow' })).toHaveValue(
      'yellowKey'
    );
    expect(view.getAllByRole('option')[0]).toHaveTextContent('red');
  });

  it('sets the key of option tags using the form of `${id}-${value}` when the prop id is passed and options is an object', () => {
    const { view } = renderView({ options: selectOptionsObject });
    const keyWithId = `${defaultProps.id}-redKey`;
    view.getByTestId(keyWithId);
  });
});
