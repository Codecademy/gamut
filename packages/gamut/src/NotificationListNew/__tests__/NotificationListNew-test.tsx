import { setupRtl } from '@codecademy/gamut-tests';

import { Notification } from '../../NotificationList/typings';
import { NotificationListNew, NotificationListNewProps } from '..';

const onNotificationClick = jest.fn();
const handleDismiss = jest.fn();

const linkedNotification: Notification = {
  text: 'Notification 1',
  id: '1',
  date: '5 hours',
  link: 'https://codecademy.com',
  campaign: 'new campaign 1',
};

const noLinkNotification: Notification = {
  text: 'Notification 2',
  id: '2',
  date: '3 days',
  campaign: 'new campaign 2',
};

const NotificationListProps: NotificationListNewProps = {
  notifications: [linkedNotification, noLinkNotification],
  handleDismiss,
  onNotificationClick,
};

const EmptyNotificationslistProps: NotificationListNewProps = {
  notifications: [],
};

const renderNotificationsList = setupRtl(
  NotificationListNew,
  NotificationListProps
);

const renderEmptyNotificationsList = setupRtl(
  NotificationListNew,
  EmptyNotificationslistProps
);

describe('NotificationListNew', () => {
  it('renders a list of notifications', () => {
    const { view } = renderNotificationsList();
    view.getByText('Notification 1');
    view.getByText('Notification 2');
  });
  it('passes down an on click function to the notification component', () => {
    const { view } = renderNotificationsList();
    view.getByRole('link').click();
    expect(onNotificationClick).toHaveBeenCalled();
  });

  it('passes down a dismiss function to the notification component', () => {
    const { view } = renderNotificationsList();
    view.getAllByRole('button').map((dismissBtn) => {
      return dismissBtn.click();
    });
    expect(handleDismiss).toHaveBeenCalledTimes(2);
  });

  it('renders a message when the user has no more notifications', () => {
    const { view } = renderEmptyNotificationsList();
    view.getByText('Empty Notifications Placeholder');
  });
});
