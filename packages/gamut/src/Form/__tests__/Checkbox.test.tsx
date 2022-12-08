import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Checkbox } from '../Checkbox';

const onChange = jest.fn();

const renderView = setupRtl(Checkbox, {
  htmlFor: 'some-label',
  label: 'Some label',
  onChange,
});

describe('<Checkbox>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { view } = renderView({ checked: true });

    view.getByRole('checkbox', { checked: true });
  });

  it('calls the onChange callback when the input changes', () => {
    const onChange = jest.fn();

    const { view } = renderView({ onChange });

    const checkbox = view.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  it('accepts JSX in the label', () => {
    const { view } = renderView({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    view.getByAltText('my cat');
  });

  it('accepts an aria-label', () => {
    const { view } = renderView({
      'aria-label': 'i am a labeled checkbox',
    });
    expect(view.getByLabelText('i am a labeled checkbox')).toHaveAttribute(
      'type',
      'checkbox'
    );
  });
});
