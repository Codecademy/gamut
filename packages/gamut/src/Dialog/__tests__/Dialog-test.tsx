import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';

import { Dialog } from '..';

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

    fireEvent.click(view.getByLabelText('Close Dialog'));
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
});
