import React from 'react';
import { mount } from 'enzyme';

import { NotificationList } from '..';
import { NotificationItem } from '../NotificationItem';

const notifications = [
  {
    text: 'notification 1',
    id: '1',
    date: 'Fri Mar 15 2019 09:00:00 GMT-0400',
    campaign: 'new campaign',
  },
  {
    text: 'notification 2',
    id: '2',
    date: 'Fri Mar 15 2019 09:10:00 GMT-0400',
    campaign: 'new campaign',
  },
  {
    text: 'notification 3',
    id: '3',
    date: 'Fri Mar 15 2019 09:20:00 GMT-0400',
    campaign: 'new campaign',
  },
  {
    text: 'notification 4',
    id: '4',
    date: 'Fri Mar 15 2019 09:30:00 GMT-0400',
    campaign: 'new campaign',
  },
  {
    text: 'notification 5',
    id: '5',
    date: 'Fri Mar 15 2019 09:40:00 GMT-0400',
    campaign: 'new campaign',
  },
  {
    text: 'notification 6',
    id: '6',
    date: 'Fri Mar 15 2019 09:50:00 GMT-0400',
    campaign: 'new campaign',
  },
];

describe('NotificationList', () => {
  it('renders a message when no notifications are passed in', () => {
    const wrapper = mount(<NotificationList notifications={[]} />);
    expect(wrapper.text()).toEqual(
      "No new notifications.You're all caught up!"
    );
  });

  it('passes down the onNotificationClick function', () => {
    const onNotificationClick = jest.fn();
    const wrapper = mount(
      <NotificationList
        notifications={notifications}
        onNotificationClick={onNotificationClick}
      />
    );

    wrapper.find('button').first().simulate('click');

    expect(onNotificationClick).toHaveBeenCalledWith(notifications[0]);
  });
});
