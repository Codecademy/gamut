import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import React from 'react';

import { Flyout, FlyoutProps } from '..';

const FlyoutContainer: React.FC<Partial<FlyoutProps>> = (props) => {
  return (
    <div data-testid="flyout-outside">
      <Flyout {...props} button={<button type="button">Test</button>}>
        <div data-testid="flyout-content">Howdy!</div>
      </Flyout>
    </div>
  );
};

const renderFlyout = setupRtl(FlyoutContainer);

describe('Flyout', () => {
  it('renders flyout content when "initialExpanded" is true', () => {
    renderFlyout({ initialExpanded: true });
    screen.getByTestId('flyout-content');
  });

  it('does not render flyout content when "initialExpanded" is false', () => {
    renderFlyout();
    expect(screen.queryByTestId('flyout-content')).toBe(null);
  });

  it('renders flyout content when button is clicked', async () => {
    renderFlyout();
    fireEvent.click(screen.getByText('Test'));
    screen.getByTestId('flyout-content');
  });

  describe('clicking outside the flyout', () => {
    it('closes flyout when "clickOutsideCloses" is true', async () => {
      renderFlyout();
      fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
      await waitFor(() =>
        expect(screen.queryByTestId('flyout-content')).toBe(null)
      );
    });

    it('does not close flyout when "clickOutsideCloses" is false', async () => {
      renderFlyout({ initialExpanded: true, clickOutsideCloses: false });
      fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
      await waitFor(() => expect(screen.queryByTestId('flyout-content')));
    });
  });

  it('does not close flyout when clicking inside flyout', async () => {
    renderFlyout({ initialExpanded: true });
    fireEvent.mouseDown(screen.getByTestId('flyout-content'));
    await waitFor(() => expect(screen.queryByTestId('flyout-content')));
  });

  describe('pressing the escape key', () => {
    it('closes flyout when "escapeCloses" is true', async () => {
      const { view } = renderFlyout();
      fireEvent.keyDown(view.baseElement, {
        key: 'Escape',
        code: 'Escape',
      });

      await waitFor(() =>
        expect(screen.queryByTestId('flyout-content')).toBe(null)
      );
    });

    it('does not close flyout when "escapeCloses" is false', async () => {
      const { view } = renderFlyout({
        initialExpanded: true,
        escapeCloses: false,
      });

      fireEvent.keyDown(view.baseElement, {
        key: 'Escape',
        code: 'Escape',
      });

      await waitFor(() => expect(screen.queryByTestId('flyout-content')));
    });
  });
});
