import React from 'react';
import { shallow } from 'enzyme';
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
    const renderedNotification = shallow(
      <NotificationItem notification={linkedNotification} />
    );

    expect(renderedNotification.prop('as')).toBe('a');
  });

  it('renders a button if no href is specified', () => {
    const renderedNotification = shallow(
      <NotificationItem notification={noLinkNotification} />
    );

    expect(renderedNotification.prop('as')).toBe('button');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const renderedNotification = shallow(
      <NotificationItem notification={noLinkNotification} onClick={onClick} />
    );

    renderedNotification.find('NotificationItemElement').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
