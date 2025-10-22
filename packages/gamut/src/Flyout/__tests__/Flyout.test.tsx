import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Flyout } from '..';

jest.mock('react-use', () => ({
  ...jest.requireActual<{}>('react-use'),
  useMedia: () => false,
}));

const renderView = setupRtl(Flyout, {
  children: <div data-testid="flyout-content">Howdy!</div>,
  closeLabel: 'Close flyout',
  onClose: jest.fn(),
  title: 'hi!!!',
}).options({
  wrapper: ({ children }) => <div data-testid="flyout-outside">{children}</div>,
});

describe('Flyout', () => {
  const expectFlyoutOpen = (view: RenderResult) =>
    waitFor(() => view.getByTestId('flyout-content'));

  const expectFlyoutClosed = (view: RenderResult) =>
    waitFor(() => expect(view.queryByTestId('flyout-content')).toBeNull());

  it('renders flyout content when "expanded" is true', async () => {
    const { view } = renderView({ expanded: true });
    await expectFlyoutOpen(view);
  });

  it('does not render flyout content when "expanded" is false', async () => {
    const { view } = renderView({ expanded: false });
    await expectFlyoutClosed(view);
  });

  it('calls onClose on button click', async () => {
    const { props, view } = renderView({ expanded: true });

    await userEvent.click(view.getByLabelText('Close'));

    expect(props.onClose).toHaveBeenCalled();
  });

  describe('clicking outside the flyout', () => {
    const clickOutsideFlyout = (view: RenderResult) =>
      act(() => {
        fireEvent.mouseDown(view.getByTestId('flyout-outside'));
      });

    it('closes flyout', async () => {
      const { view } = renderView();

      clickOutsideFlyout(view);

      await expectFlyoutClosed(view);
    });
  });

  it('does not close flyout when clicking inside flyout', async () => {
    const { view } = renderView({ expanded: true });

    act(() => {
      fireEvent.mouseDown(view.getByTestId('flyout-content'));
    });

    await expectFlyoutOpen(view);
  });

  describe('pressing the escape key', () => {
    const pressEsc = (view: RenderResult) =>
      act(() => {
        fireEvent.keyDown(view.baseElement, {
          key: 'Escape',
          code: 'Escape',
        });
      });

    it('closes the flyout', async () => {
      const { view } = renderView();

      pressEsc(view);

      await expectFlyoutClosed(view);
    });
  });
});
