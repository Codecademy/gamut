import { setupEnzyme } from '@codecademy/gamut-tests';

import { Checkbox } from '../Checkbox';

const onChange = jest.fn();

const renderWrapper = setupEnzyme(Checkbox, {
  htmlFor: 'some-label',
  label: 'Some label',
  onChange,
});

describe('<Checkbox>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { wrapper } = renderWrapper({ checked: true });

    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(
      true
    );
  });
});
