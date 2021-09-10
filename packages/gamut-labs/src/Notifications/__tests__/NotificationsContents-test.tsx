import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { createStubNotification } from '../__fixtures__/stubs';
import { NotificationsContents } from '../NotificationsContents';

const renderView = setupRtl(NotificationsContents, {
  actions: {
    clear: jest.fn(),
    click: jest.fn(),
    dismiss: jest.fn(),
    read: jest.fn(),
    track: jest.fn(),
  },
  onTrackingClick: jest.fn(),
});

describe('NotificationsContents', () => {
  it('tracks a click for a notification when the notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1' }),
      createStubNotification({ id: '2' }),
      createStubNotification({ id: '3' }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[1]);

    expect(props.actions.click).toHaveBeenCalledWith(notifications[1]);
  });

  it('marks the notification as read when an unread notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1' }),
      createStubNotification({ id: '2', unread: true }),
      createStubNotification({ id: '3' }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[1]);

    expect(props.actions.read).toHaveBeenCalledWith(notifications[1]);
  });

  it('does not the notification as read when a read notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1' }),
      createStubNotification({ id: '2', unread: false }),
      createStubNotification({ id: '3' }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[1]);

    expect(props.actions.read).not.toHaveBeenCalled();
  });
});
