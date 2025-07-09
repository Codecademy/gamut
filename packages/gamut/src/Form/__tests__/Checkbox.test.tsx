import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Checkbox } from '../inputs/Checkbox';

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
  it('sets the input indeterminate state when the prop is passed', () => {
    const { view } = renderView({ indeterminate: true });

    const checkbox = view.getByRole('checkbox');

    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('checked overrides indeterminate when both are true', () => {
    const { view } = renderView({ indeterminate: true, checked: true } as any);

    const checkbox = view.getByRole('checkbox', { checked: true });
    expect(checkbox).toHaveProperty('indeterminate', false);
  });

  it('does not set indeterminate state when the prop is false', () => {
    const { view } = renderView({ indeterminate: false });

    const checkbox = view.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', false);
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
