import { setupRtl } from '@codecademy/gamut-tests';

import {
  NotificationItemNew,
  NotificationItemNewProps,
} from '../NotificationItemNew';

const linkHref = 'https://codecademy.com';
const handleClick = jest.fn();
const handleDismiss = jest.fn();

const linkedNotificationProps: NotificationItemNewProps = {
  notification: {
    text: 'notification 1',
    id: '2',
    date: '5 hours',
    link: linkHref,
    campaign: 'new campaign 1',
  },
  handleClick,
  handleDismiss,
};

const noLinkNotificationProps: NotificationItemNewProps = {
  notification: {
    text: 'notification 2',
    id: '2',
    date: '3 days',
    campaign: 'new campaign 2',
  },
  handleClick,
  handleDismiss,
};

const renderNotificationItemWithLink = setupRtl(
  NotificationItemNew,
  linkedNotificationProps
);
const renderNotificationItemWithNoLink = setupRtl(
  NotificationItemNew,
  noLinkNotificationProps
);

describe('NotificationItemNew', () => {
  it('renders a link if an href is specified', () => {
    const { view } = renderNotificationItemWithLink();
    const href = view.getByRole('link').getAttribute('href');
    expect(href).toStrictEqual(linkHref);
  });

  it('calls handleClick upon clicking a link', () => {
    const { view } = renderNotificationItemWithLink();
    view.getByRole('link').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not render a link if no href is specified', () => {
    const { view } = renderNotificationItemWithNoLink();
    expect(view.queryByRole('link')).toBeFalsy();
  });

  it('can be dismissed', () => {
    const { view } = renderNotificationItemWithNoLink();
    view.getByRole('button').click();
    expect(handleDismiss).toHaveBeenCalled();
  });
});
