import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from '../NotificationItem';
const linkedNotification = {
  text: 'notification 2',
  id: '2',
  date: '2019-08-29T15:27:22Z',
  link: '/#',
};
const noLinkNotification = {
  text: 'notification 1',
  id: '1',
  date: '2019-08-29T15:27:22Z',
};
describe('NotificationItem', () => {
  it('renders an anchor tag if href is specified', () => {
    const renderedNotification = shallow(
      React.createElement(NotificationItem, {
        notification: linkedNotification,
      })
    );
    expect(renderedNotification.name()).toBe('a');
  });
  it('renders a div if no href is specified', () => {
    const renderedNotification = shallow(
      React.createElement(NotificationItem, {
        notification: noLinkNotification,
      })
    );
    expect(renderedNotification.name()).toBe('div');
  });
});
//# sourceMappingURL=NotificationItem-test.js.map
