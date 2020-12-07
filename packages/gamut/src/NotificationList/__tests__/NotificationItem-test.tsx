import React from 'react';
import { mount } from 'enzyme';
import { NotificationItem } from '../NotificationItem';

const linkedNotification = {
  text: 'notification 2',
  id: '2',
  date: '2019-08-29T15:27:22Z',
  link: '/#',
  campaign: 'new campaign',
};

const noLinkNotification = {
  text: 'notification 1',
  id: '1',
  date: '2019-08-29T15:27:22Z',
  campaign: 'new campaign',
};

describe('NotificationItem', () => {
  it('renders an anchor tag if href is specified', () => {
    const renderedNotification = mount(
      <NotificationItem notification={linkedNotification} />
    );

    expect(renderedNotification.find('a')).toHaveLength(1);
  });

  it('renders a button if no href is specified', () => {
    const renderedNotification = mount(
      <NotificationItem notification={noLinkNotification} />
    );

    expect(renderedNotification.find('button')).toHaveLength(1);
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const renderedNotification = mount(
      <NotificationItem notification={noLinkNotification} onClick={onClick} />
    );

    renderedNotification.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
