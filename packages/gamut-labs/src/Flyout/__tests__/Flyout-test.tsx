import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
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
  it('renders flyout content when "initialExpanded" is true', () => {
    renderFlyout({ initialExpanded: true });
    screen.getByTestId('flyout-content');
  });

  it('does not render flyout content when "initialExpanded" is false', () => {
    renderFlyout();
    expect(screen.queryByTestId('flyout-content')).toBe(null);
  });

  it('passes the toggle method into the rendered toggle button', async () => {
    renderFlyout();

    expect(screen.queryByTestId('flyout-content')).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByText(TestButtonText));
    });

    screen.getByTestId('flyout-content');
  });

  describe('clicking outside the flyout', () => {
    it('closes flyout when "clickOutsideDoesNotClose" is true', async () => {
      renderFlyout({ clickOutsideDoesNotClose: true });
      await act(async () => {
        fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
      });

      expect(screen.queryByTestId('flyout-content')).toBe(null);
    });

    it('does not close flyout when "clickOutsideDoesNotClose" is false', async () => {
      renderFlyout({ initialExpanded: true });
      await act(async () => {
        fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
      });
      screen.queryByTestId('flyout-content');
    });
  });

  it('does not close flyout when clicking inside flyout', async () => {
    renderFlyout({ initialExpanded: true });
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId('flyout-content'));
    });
    screen.queryByTestId('flyout-content');
  });

  describe('pressing the escape key', () => {
    it('closes flyout when "escapeDoesNotClose" is true', async () => {
      const { view } = renderFlyout({ escapeDoesNotClose: true });
      await act(async () => {
        fireEvent.keyDown(view.baseElement, {
          key: 'Escape',
          code: 'Escape',
        });
      });

      screen.queryByTestId('flyout-content');
    });

    it('does not close flyout when "escapeDoesNotClose" is false', async () => {
      const { view } = renderFlyout({
        initialExpanded: true,
      });

      await act(async () => {
        fireEvent.keyDown(view.baseElement, {
          key: 'Escape',
          code: 'Escape',
        });
      });

      screen.queryByTestId('flyout-content');
    });
  });
});
