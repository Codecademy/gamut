import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import React from 'react';

import { Flyout, FlyoutProps } from '..';

const FlyoutContainer: React.FC<Partial<FlyoutProps>> = (props) => {
  return (
    <div data-testid="flyout-outside">
      <Flyout
        onToggle={() => null}
        {...props}
        button={<button type="button">Test</button>}
      >
        <div data-testid="flyout-content">Howdy!</div>
      </Flyout>
    </div>
  );
};

const renderFlyout = setupRtl(FlyoutContainer);

describe('Flyout', () => {
  it('renders flyout content when expanded is true', () => {
    renderFlyout({ expanded: true });
    screen.getByTestId('flyout-content');
  });

  it('does not render flyout content when expanded is false', () => {
    renderFlyout();
    expect(screen.queryByTestId('flyout-content')).toBe(null);
  });

  it('renders flyout content when button is clicked', () => {
    renderFlyout();
    fireEvent.click(screen.getByText('Test'));
    screen.getByTestId('flyout-content');
  });

  describe('clicking outside the flyout', () => {
    it('closes flyout when clickOutsideCloses is true', async () => {
      renderFlyout({ expanded: true, clickOutsideCloses: true });

      fireEvent.mouseDown(screen.getByTestId('flyout-outside'));

      await waitFor(() =>
        expect(screen.queryByTestId('flyout-content')).toBe(null)
      );
    });

    it('does not close flyout when clickOutsideCloses is false', async () => {
      renderFlyout({ expanded: true, clickOutsideCloses: false });

      fireEvent.mouseDown(screen.getByTestId('flyout-outside'));

      await waitFor(() => screen.getByTestId('flyout-content'));
    });
  });

  it('does not close flyout when clicking inside flyout', () => {
    renderFlyout({ expanded: true });
    fireEvent.mouseDown(screen.getByTestId('flyout-content'));
    screen.getByTestId('flyout-content');
  });

  describe('pressing the escape key', () => {
    it('closes flyout when escapeCloses is true', async () => {
      const { view } = renderFlyout({ expanded: true });
      fireEvent.keyDown(view.baseElement, {
        key: 'Escape',
        code: 'Escape',
      });

      await waitFor(() =>
        expect(screen.queryByTestId('flyout-content')).toBe(null)
      );
    });

    it('does not close flyout when escapeCloses is false', () => {
      const { view } = renderFlyout({ expanded: true, escapeCloses: false });
      fireEvent.keyDown(view.baseElement, {
        key: 'Escape',
        code: 'Escape',
      });
      screen.getByTestId('flyout-content');
    });
  });
});
