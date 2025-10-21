import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import * as React from 'react';

import { Alert } from '../Alert';

const children = 'Hello';
const onClose = jest.fn();
const onClick = jest.fn();

const mockUseMeasure = jest.fn(() => [jest.fn(), { width: 1600 }]);

jest.mock('react-use', () => ({
  ...jest.requireActual<{}>('react-use'),
  get useMeasure() {
    return mockUseMeasure;
  },
}));

const renderView = setupRtl(Alert, {
  onClose,
  children,
  variant: 'notice',
});

describe('Alert', () => {
  it('calls the onClose callback when the close button is clicked', () => {
    const { view } = renderView({});

    const buttons = view.getAllByRole('button');

    expect(buttons.length).toBe(2);

    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable button', () => {
    const { view } = renderView({ cta: { onClick, children: 'Click Me!' } });

    const cta = view.getByRole('button', { name: 'Click Me!' });

    act(() => {
      fireEvent.click(cta);
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const { view } = renderView({
      cta: { children: 'Click Me', href: '/hello', onClick },
    });

    const cta = view.getByRole('link');

    act(() => {
      fireEvent.click(cta);
    });

    expect(cta).toHaveAttribute('href', '/hello');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a clickable button to expand the truncated section', () => {
    const { view } = renderView({});

    const expandButton = view.getByRole('button', { name: 'Expand' });

    expect(view.queryByText(children)).toBeNull();

    act(() => {
      fireEvent.click(expandButton);
    });

    expect(view.findByText(children));
  });

  it('does not render a clickable button and renders untruncated text when on the xs screen size', () => {
    mockUseMeasure.mockReturnValueOnce([jest.fn(), { width: 400 }]);

    const { view } = renderView({});

    expect(view.queryByRole('button', { name: 'Expand' })).toBeNull();
    expect(view.findByText(children));
  });

  describe('closeButtonProps functionality', () => {
    it('applies a ref to the close button when closeButtonProps.ref is provided', () => {
      const closeButtonRef = React.createRef<HTMLButtonElement>();
      const { view } = renderView({
        closeButtonProps: { ref: closeButtonRef },
      });

      const closeButton = view.getByRole('button', { name: 'Close alert' });
      expect(closeButtonRef.current).toBe(closeButton);
    });

    it('uses custom tooltip text when closeButtonProps.tip is provided', () => {
      const customTip = 'Custom close tooltip';
      const { view } = renderView({
        closeButtonProps: { tip: customTip },
      });

      const closeButton = view.getByRole('button', { name: customTip });
      expect(closeButton).toHaveAttribute('aria-label', customTip);
    });

    it('uses default tooltip text when closeButtonProps.tip is not provided', () => {
      const { view } = renderView();

      const closeButton = view.getByRole('button', { name: 'Close alert' });
      expect(closeButton).toHaveAttribute('aria-label', 'Close alert');
    });

    it('disables the close button when closeButtonProps.disabled is true', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: true },
      });

      const closeButton = view.getByRole('button', { name: 'Close alert' });
      expect(closeButton).toBeDisabled();
    });

    it('enables the close button when closeButtonProps.disabled is false', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: false },
      });

      const closeButton = view.getByRole('button', { name: 'Close alert' });
      expect(closeButton).not.toBeDisabled();
    });

    it('enables the close button by default when closeButtonProps.disabled is not provided', () => {
      const { view } = renderView();

      const closeButton = view.getByRole('button', { name: 'Close alert' });
      expect(closeButton).not.toBeDisabled();
    });
  });
});
