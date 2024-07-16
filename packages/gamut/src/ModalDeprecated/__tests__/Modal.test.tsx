import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ModalDeprecated, ModalDeprecatedProps } from '..';

const renderModal = (props?: Partial<ModalDeprecatedProps>) => {
  return render(
    <ThemeProvider theme={theme}>
      <ModalDeprecated isOpen onRequestClose={jest.fn()} {...props}>
        <div data-testid="modal-content">{props?.children}</div>
      </ModalDeprecated>
    </ThemeProvider>
  );
};

describe('ModalDeprecated', () => {
  it('renders children when isOpen is true', () => {
    const children = 'Hey';
    const { baseElement } = renderModal({ children });
    expect(baseElement).toHaveTextContent(children);
  });

  it('does not render when isOpen is false', () => {
    const children = 'Hey';
    const { baseElement } = renderModal({ isOpen: false, children });
    expect(baseElement).not.toHaveTextContent(children);
  });

  it('does not render its close button if hideDefaultCloseButton is true', () => {
    renderModal({
      hideDefaultCloseButton: true,
      children: <button type="button">Click Me</button>,
    });

    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('renders its close button if hideDefaultCloseButton is false', () => {
    renderModal();

    expect(screen.queryByLabelText('Close')).toBeInTheDocument();
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderModal({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('triggers onRequestClose callback when clicking outside when clickOutsideCloses is true', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderModal({
      isOpen: true,
      onRequestClose,
    });
    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(baseElement);
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderModal({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('modal-content'));
    expect(onRequestClose.mock.calls.length).toBe(0);
  });
});
