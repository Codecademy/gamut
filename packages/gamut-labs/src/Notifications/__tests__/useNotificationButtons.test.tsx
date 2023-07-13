import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';

import { createStubNotification } from '../__fixtures__/stubs';
import { useNotificationButtons } from '../useNotificationButtons';

const actions = {
  clear: jest.fn(),
  click: jest.fn(),
  dismiss: jest.fn(),
  read: jest.fn(),
  track: jest.fn(),
};

const props = { actions };

describe('useNotificationButtons', () => {
  it('does not render a Clear All button when there are no notifications', () => {
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications: [] })
    );

    expect(hook.result.current).toEqual([null, null, []]);
  });

  it('renders a Clear All button when there are fewer notifications than the display limit', () => {
    const notifications = [createStubNotification()];
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications })
    );

    expect(hook.result.current).toEqual([
      expect.anything(),
      null,
      notifications,
    ]);
  });

  it('does not render a Clear All button when there are more notifications than the display limit and Show More was not pressed', () => {
    const notifications = times(4, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications })
    );

    expect(hook.result.current).toEqual([
      null,
      expect.anything(),
      notifications.slice(0, 3),
    ]);
  });

  it('renders a Clear All button when there are more notifications than the display limit and Show More was pressed', () => {
    const notifications = times(4, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    );

    act(() => {
      userEvent.click(view.getByText(/Show.*More/));
    });

    expect(hook.result.current).toEqual([
      expect.anything(),
      expect.anything(),
      notifications,
    ]);
  });

  it('clears notifications when the Clear All button is pressed', () => {
    const hook = renderHook(() =>
      useNotificationButtons({
        ...props,
        notifications: times(2, (id) =>
          createStubNotification({ id: `${id}` })
        ),
      })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[0]}</MockGamutProvider>
    );

    userEvent.click(view.getByLabelText('Clear all 2 notifications'));

    expect(actions.clear).toHaveBeenCalled();
    expect(actions.track).toHaveBeenCalledWith('notification_clear_all');
  });

  it('expands notifications when the Show More button is pressed', () => {
    const notifications = times(5, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    );

    act(() => {
      userEvent.click(view.getByText(/Show.*More/));
    });

    expect(hook.result.current[2]).toEqual(notifications);
    expect(actions.read).toHaveBeenCalledWith(notifications.slice(3));
    expect(actions.track).toHaveBeenCalledWith('notification_show_more');
  });

  it('contracts notifications when the Show Less button is pressed', () => {
    const notifications = times(4, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...props, notifications })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    );

    act(() => {
      userEvent.click(view.getByText(/Show.*More/));
    });

    act(() => {
      view.rerender(
        <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
      );
    });

    act(() => {
      userEvent.click(view.getByText(/Show.*Less/));
    });

    expect(hook.result.current[2]).toEqual(notifications.slice(0, 3));
    expect(actions.track).toHaveBeenCalledTimes(1);
  });
});
