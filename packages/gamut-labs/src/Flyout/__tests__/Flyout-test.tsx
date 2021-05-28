import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';

import { Flyout, FlyoutProps } from '..';

const FlyoutContainer: React.FC<Partial<FlyoutProps>> = (props) => {
  return (
    <div data-testid="flyout-outside">
      <Flyout {...props} button={<button>Test</button>}>
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

  it('closes flyout when escape key is clicked and escapeCloses is true', () => {
    const { view } = renderFlyout({ expanded: true });
    fireEvent.keyDown(view.baseElement, {
      key: 'Escape',
      code: 'Escape',
    });
    expect(screen.queryByTestId('flyout-content')).toBe(null);
  });

  it('does not close flyout when escape key is clicked and escapeCloses is false', () => {
    const { view } = renderFlyout({ expanded: true, escapeCloses: false });
    fireEvent.keyDown(view.baseElement, {
      key: 'Escape',
      code: 'Escape',
    });
    screen.getByTestId('flyout-content');
  });

  it('closes flyout when clicking outside flyout and clickOutsideCloses is true', () => {
    renderFlyout({ expanded: true });
    fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
    expect(screen.queryByTestId('flyout-content')).toBe(null);
  });

  it('does not close flyout when clicking outside flyout and clickOutsideCloses is false', () => {
    renderFlyout({ expanded: true, clickOutsideCloses: false });
    fireEvent.mouseDown(screen.getByTestId('flyout-outside'));
    screen.getByTestId('flyout-content');
  });

  it('does not close flyout when clicking inside flyout', () => {
    renderFlyout({ expanded: true });
    fireEvent.mouseDown(screen.getByTestId('flyout-content'));
    screen.getByTestId('flyout-content');
  });
});
