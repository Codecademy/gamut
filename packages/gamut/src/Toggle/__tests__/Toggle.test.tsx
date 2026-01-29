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
  });
});
