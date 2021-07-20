import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { createStubNotification } from '../__fixtures__/stubs';
import { NotificationsPaneContents } from '../NotificationsPaneContents';

const renderView = setupRtl(NotificationsPaneContents, {
  baseUrl: '',
  onTrackingClick: jest.fn(),
  setNotifications: jest.fn(),
});

describe('NotificationsPaneContents', () => {
  it('updates notifications to remove a notification when the notification is dismissed', () => {
    const notifications = [
      createStubNotification({ id: '1' }),
      createStubNotification({ id: '2' }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByLabelText('Dismiss Notification')[0]);

    expect(props.setNotifications).toHaveBeenCalledWith([notifications[1]]);
  });

  it('does not update notifications to mark a read notification as read when the notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1', unread: false }),
      createStubNotification({ id: '2', unread: true }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[0]);

    expect(props.onTrackingClick).toHaveBeenCalledWith(
      'notification_bell_cta',
      notifications[0]
    );
    expect(props.setNotifications).not.toHaveBeenCalled();
  });

  it('updates notifications to mark an unread notification as read when the notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1', unread: true }),
      createStubNotification({ id: '2', unread: true }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[0]);

    expect(props.onTrackingClick).toHaveBeenCalledWith(
      'notification_bell_cta',
      notifications[0]
    );
    expect(props.setNotifications).toHaveBeenCalledWith([
      { ...notifications[0], unread: false },
      notifications[1],
    ]);
  });
});
