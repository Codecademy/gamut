import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';
import React from 'react';

import { createStubNotification } from '../__fixtures__/stubs';
import { useNotificationButtons } from '../useNotificationButtons';

const actions = {
  clear: jest.fn(),
  click: jest.fn(),
  dismiss: jest.fn(),
  read: jest.fn(),
  track: jest.fn(),
};

const defaultProps = { actions };

globalThis.fetch = jest.fn();

describe('useNotificationButtons', () => {
  it('returns null buttons when there fewer notifications than the display limit', async () => {
    const notifications = [createStubNotification()];
    const hook = renderHook(() =>
      useNotificationButtons({ ...defaultProps, notifications })
    );

    expect(hook.result.current).toEqual([null, null, notifications]);
  });

  it('sets notifications to an empty array when the Clear All button is pressed', async () => {
    const hook = renderHook(() =>
      useNotificationButtons({
        ...defaultProps,
        notifications: times(4, (id) =>
          createStubNotification({ id: `${id}` })
        ),
      })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[0]}</MockGamutProvider>
    );

    userEvent.click(view.getByLabelText('Clear all 4 notifications'));

    expect(fetch).toHaveBeenCalledWith(`/notifications?target=web`, {
      method: 'DELETE',
    });
    expect(defaultProps.actions.clear).toHaveBeenCalled();
    expect(defaultProps.actions.clear).toHaveBeenCalledWith(
      'notification_clear_all'
    );
  });

  it('expands notifications when the Show More button is pressed', async () => {
    const notifications = times(4, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...defaultProps, notifications })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    );

    act(() => {
      userEvent.click(view.getByText(/Show.*More/));
    });

    expect(hook.result.current[2]).toEqual(notifications);
    expect(actions.click).toHaveBeenCalledWith('notification_show_more');
  });

  it('contracts notifications when the Show Less button is pressed', async () => {
    const notifications = times(4, (id) =>
      createStubNotification({ id: `${id}` })
    );
    const hook = renderHook(() =>
      useNotificationButtons({ ...defaultProps, notifications })
    );

    const renderView = () =>
      render(<MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>);

    act(() => {
      userEvent.click(renderView().getByText(/Show.*More/));
    });
    act(() => {
      userEvent.click(renderView().getByText(/Show.*Less/));
    });

    expect(hook.result.current[2]).toEqual(notifications.slice(0, 3));
    expect(actions.click).toHaveBeenCalledWith('notification_show_more');
  });
});
