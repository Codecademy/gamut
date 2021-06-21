import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
import { RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { Flyout } from '..';

const TestButtonText = 'Test';

const renderFlyout = setupRtl(Flyout, {
  renderButton: (onClick: () => void) => (
    <button type="button" onClick={onClick}>
      {TestButtonText}
    </button>
  ),
  children: <div data-testid="flyout-content">Howdy!</div>,
});

renderFlyout.options({
  wrapper: ({ children }) => <div data-testid="flyout-outside">{children}</div>,
});

describe('Flyout', () => {
  const clickToggleButton = async () =>
    await act(async () => {
      fireEvent.click(screen.getByText(TestButtonText));
    });

  const expectFlyoutOpen = () =>
    waitFor(() => screen.getByTestId('flyout-content'));

  const expectFlyoutClosed = () =>
    waitFor(() => expect(screen.queryByTestId('flyout-content')).toBeNull());

  it('renders flyout content when "initialExpanded" is true', async () => {
    renderFlyout({ initialExpanded: true });
    await expectFlyoutOpen();
  });

  it('does not render flyout content when "initialExpanded" is false', async () => {
    renderFlyout();
    await expectFlyoutClosed();
  });

  it('toggles the flyout expanded status on button click', async () => {
    renderFlyout();
    await expectFlyoutClosed();

    await clickToggleButton();

    await expectFlyoutOpen();

    await clickToggleButton();

    await expectFlyoutClosed();
  });

  describe('clicking outside the flyout', () => {
    const clickOutsideFlyout = async () =>
      await act(async () => {
        fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
      });

    it('closes flyout when "clickOutsideDoesNotClose" is true', async () => {
      renderFlyout({ clickOutsideDoesNotClose: true });

      await clickOutsideFlyout();

      await expectFlyoutClosed();
    });

    it('does not close flyout when "clickOutsideDoesNotClose" is false', async () => {
      renderFlyout({ initialExpanded: true });

      await clickOutsideFlyout();

      await expectFlyoutOpen();
    });
  });

  it('does not close flyout when clicking inside flyout', async () => {
    renderFlyout({ initialExpanded: true });
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId('flyout-content'));
    });

    await expectFlyoutOpen();
  });

  describe('pressing the escape key', () => {
    const pressEsc = async (view: RenderResult) =>
      await act(async () => {
        fireEvent.keyDown(view.baseElement, {
          key: 'Escape',
          code: 'Escape',
        });
      });

    it('closes flyout when "escapeDoesNotClose" is true', async () => {
      const { view } = renderFlyout({ escapeDoesNotClose: true });

      await pressEsc(view);

      await expectFlyoutClosed();
    });

    it('does not close flyout when "escapeDoesNotClose" is false', async () => {
      const { view } = renderFlyout({
        escapeDoesNotClose: false,
        initialExpanded: true,
      });

      await pressEsc(view);

      await expectFlyoutOpen();
    });
  });

  it('passes the ability to close the flyout to passed ref', async () => {
    const closeFlyoutRef = { current: () => {} };

    renderFlyout({ closeFlyoutRef, initialExpanded: true });

    await expectFlyoutOpen();

    act(closeFlyoutRef.current);

    await expectFlyoutClosed();
  });
});
