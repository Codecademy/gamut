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
  it('dismisses the notification when an unread notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1' }),
      createStubNotification({ id: '2' }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByLabelText('Dismiss Notification')[0]);

    expect(props.actions.dismiss).toHaveBeenCalledWith([notifications[1]]);
  });

  it('does not dismiss the notification when a read notification is clicked', () => {
    const notifications = [
      createStubNotification({ id: '1', unread: false }),
      createStubNotification({ id: '2', unread: true }),
    ];
    const { props, view } = renderView({ notifications });

    userEvent.click(view.getAllByRole('link')[0]);

    expect(props.actions.click).toHaveBeenCalledWith(
      'notification_bell_cta',
      notifications[0]
    );
    expect(props.actions.dismiss).not.toHaveBeenCalled();
  });
});
