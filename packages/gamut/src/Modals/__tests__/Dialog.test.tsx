import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
import * as React from 'react';

import { Dialog } from '../Dialog';

const onRequestClose = jest.fn();
const onConfirm = jest.fn();
const onCancel = jest.fn();

const defaultProps = {
  isOpen: true,
  title: 'Hello world',
  children: 'Close me please',
  onRequestClose,
  confirmCta: {
    children: 'Confirm',
    onClick: onConfirm,
  },
  cancelCta: {
    children: 'Cancel',
    onClick: onCancel,
  },
};

const renderView = setupRtl(Dialog, defaultProps);

describe('Dialog', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children structured content  when isOpen is true', () => {
    const { view } = renderView();

    view.getByText(defaultProps.title);
    view.getByText(defaultProps.children);
  });

  it('does not render when isOpen is false', () => {
    const { view } = renderView({ isOpen: false });
    expect(view.queryByRole('dialog')).toBe(null);
  });

  it('requests closing the dialog when the close button is clicked', () => {
    const { view } = renderView();
    const ariaLabel = 'Close dialog';

    fireEvent.click(view.getByLabelText(ariaLabel));
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('triggers onRequestClose callback when a confirm CTA is clicked', () => {
    const { view } = renderView();

    fireEvent.click(view.getByText(defaultProps.confirmCta.children));
    expect(onRequestClose.mock.calls.length).toBe(1);
    expect(onConfirm.mock.calls.length).toBe(1);
  });

  it('triggers onRequestClose callback when a cancel CTA is clicked is clicked', () => {
    const { view } = renderView();

    fireEvent.click(view.getByText(defaultProps.cancelCta.children));
    expect(onRequestClose.mock.calls.length).toBe(1);
    expect(onCancel.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when clicking the dialog', () => {
    renderView({
      isOpen: true,
      onRequestClose,
    });

    fireEvent.mouseDown(screen.getByRole('dialog'));
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  describe('closeButtonProps functionality', () => {
    it('uses default tooltip text when closeButtonProps.tip is not provided', () => {
      const { view } = renderView();

      view.getByRole('button', { name: 'Close dialog' });
    });

    it('applies a ref to the close button when closeButtonProps.ref is provided', () => {
      const closeButtonRef = React.createRef<HTMLButtonElement>();
      const { view } = renderView({
        closeButtonProps: { ref: closeButtonRef },
      });

      const closeButton = view.getByRole('button', { name: 'Close dialog' });
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

    it('disables the close button when closeButtonProps.disabled is true', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: true },
      });

      const closeButton = view.getByRole('button', { name: 'Close dialog' });
      expect(closeButton).toBeDisabled();
    });

    it('enables the close button when closeButtonProps.disabled is false', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: false },
      });

      const closeButton = view.getByRole('button', { name: 'Close dialog' });
      expect(closeButton).not.toBeDisabled();
    });

    it('enables the close button by default when closeButtonProps.disabled is not provided', () => {
      const { view } = renderView();

      const closeButton = view.getByRole('button', { name: 'Close dialog' });
      expect(closeButton).not.toBeDisabled();
    });
  });
  describe('containerFocusRef functionality', () => {
    it('applies a ref to the dialog container when containerFocusRef is provided', () => {
      const containerFocusRef = React.createRef<HTMLDivElement>();
      const { view } = renderView({
        containerFocusRef,
      });

      const dialogContainer = view.getByRole('dialog');
      expect(containerFocusRef.current).toBe(dialogContainer);
    });
  });
});
