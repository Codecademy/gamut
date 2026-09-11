import { setupRtl } from '@codecademy/gamut-tests';

import { Toggle } from '..';

const action = jest.fn();

const renderView = setupRtl(Toggle, {
  label: 'Toggle Text',
  checked: true,
  onChange: action,
});

describe('Toggle', () => {
  describe('when the toggle is an input', () => {
    it('defaults to a checkbox input', () => {
      const { view } = renderView();

      view.getByRole('checkbox');
    });

    it('calls onChange when clicked', () => {
      const { view } = renderView();

      view.getByLabelText('Toggle Text').click();

      expect(action).toHaveBeenCalled();
    });

    it('renders label node', () => {
      const { view } = renderView({ label: <p>hello</p> });

      view.getByText('hello');
    });

    it('applies an aria-label appropriately when provided with no label', () => {
      const { view } = renderView({
        label: undefined,
        ariaLabel: 'Toggle Text',
      });

      view.getByLabelText('Toggle Text');
    });

    it('applies an aria-label appropriately when provided with non string label', () => {
      const { view } = renderView({
        label: <p>Hello</p>,
        ariaLabel: 'Toggle Text',
      });

      view.getByLabelText('Toggle Text');
    });

    it('is disabled when disabled is true', () => {
      const { view } = renderView({
        disabled: true,
      });

      view.getByLabelText('Toggle Text').click();

      expect(action).not.toHaveBeenCalled();
    });

    it('forwards inputProps to the input without disturbing the label', () => {
      const { view } = renderView({
        inputProps: {
          'data-marker': 'toggle-input',
          'aria-keyshortcuts': 'i',
        },
        'data-marker': 'toggle-label',
      } as any);

      const input = view.getByRole('checkbox');
      expect(input).toHaveAttribute('data-marker', 'toggle-input');
      expect(input).toHaveAttribute('aria-keyshortcuts', 'i');

      // regression: ...rest still lands on the visible label, unchanged
      const label = view.container.querySelector('label');
      expect(label).toHaveAttribute('data-marker', 'toggle-label');
    });
  });

  describe('when the toggle is a button', () => {
    it('defaults to a switch button', () => {
      const { view } = renderView({
        as: 'button',
        onChange: undefined,
        onClick: action,
      });

      view.getByRole('switch');
    });

    it('calls onClick when clicked', () => {
      const { view } = renderView({
        as: 'button',
        onChange: undefined,
        onClick: action,
      });

      view.getByLabelText('Toggle Text').click();

      expect(action).toHaveBeenCalled();
    });

    it('applies an aria-label appropriately when provided with no label', () => {
      const { view } = renderView({
        as: 'button',
        label: undefined,
        ariaLabel: 'Toggle Text',
        onChange: undefined,
        onClick: action,
      });

      view.getByLabelText('Toggle Text');
    });

    it('applies an aria-label appropriately when provided with a non string label', () => {
      const { view } = renderView({
        as: 'button',
        label: <p>hello</p>,
        ariaLabel: 'Toggle Text',
        onChange: undefined,
        onClick: action,
      });

      view.getByLabelText('Toggle Text');
    });

    it('is disabled when disabled is true', () => {
      const { view } = renderView({
        as: 'button',
        disabled: true,
        onChange: undefined,
        onClick: action,
      });

      view.getByLabelText('Toggle Text').click();

      expect(action).not.toHaveBeenCalled();
    });

    it('forwards inputProps to the button without disturbing the label', () => {
      const { view } = renderView({
        as: 'button',
        onChange: undefined,
        onClick: action,
        inputProps: {
          'data-marker': 'toggle-button',
          'aria-keyshortcuts': 'b',
        },
        'data-marker': 'toggle-label',
      } as any);

      const button = view.getByRole('switch');
      expect(button).toHaveAttribute('data-marker', 'toggle-button');
      expect(button).toHaveAttribute('aria-keyshortcuts', 'b');

      // regression: ...rest still lands on the visible label, unchanged
      const label = view.container.querySelector('label');
      expect(label).toHaveAttribute('data-marker', 'toggle-label');
    });
  });
});
