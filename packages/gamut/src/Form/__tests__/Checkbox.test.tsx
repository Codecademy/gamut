import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../inputs/Checkbox';
import { createExternalLabel } from './testUtils';

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

  it('renders an infotip', async () => {
    const info = 'small info';
    const { view } = renderView({
      label: 'label',
      infotip: { info: 'small info' },
    });
    const tip = view.getByText(info);

    expect(tip).not.toBeVisible();

    await act(async () => {
      await userEvent.click(view.getByRole('button'));
    });

    expect(tip).toBeVisible();
  });

  describe('InfoTip accessibility', () => {
    const info = 'helpful information';
    const labelText = 'Checkbox Label';

    it('automatically links InfoTip to Checkbox label via aria-labelledby', () => {
      const { view } = renderView({
        label: labelText,
        infotip: { info },
      });

      view.getByRole('button', { name: labelText });
    });

    it('uses explicit ariaLabel when provided', () => {
      const ariaLabel = 'Custom label';
      const { view } = renderView({
        label: labelText,
        infotip: { info, ariaLabel },
      });

      view.getByRole('button', { name: ariaLabel });
      expect(
        view.queryByRole('button', { name: labelText })
      ).not.toBeInTheDocument();
    });

    it('uses explicit ariaLabelledby when provided', () => {
      const externalLabelId = 'external-label-id';
      const externalLabelText = 'External Label';
      const { view } = renderView({
        label: labelText,
        infotip: { info, ariaLabelledby: externalLabelId },
      });

      createExternalLabel(view, externalLabelId, externalLabelText);

      view.getByRole('button', { name: externalLabelText });
      expect(
        view.queryByRole('button', { name: labelText })
      ).not.toBeInTheDocument();
    });

    it('links InfoTip to label with JSX label content', () => {
      const { view } = renderView({
        label: <span>{labelText}</span>,
        infotip: { info },
      });

      view.getByRole('button', { name: labelText });
    });
  });
});
