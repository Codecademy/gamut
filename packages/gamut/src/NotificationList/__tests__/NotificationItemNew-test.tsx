import { setupRtl } from '@codecademy/gamut-tests';

import {
  NotificationItemNew,
  NotificationItemNewProps,
} from '../NotificationItemNew';

const linkHref = 'https://codecademy.com';
const imageUrl = 'photo.png';
const handleClick = jest.fn();
const handleDismiss = jest.fn();

const notificationProps: NotificationItemNewProps = {
  notification: {
    text: 'notification text',
    id: 'abc2',
    date: '3 days',
    campaign: 'campaign name',
    imageUrl,
  },
  handleDismiss,
};

const getPropsByLink = (link?: string) => {
  return {
    notification: {
      text: 'notification 1',
      id: '2',
      date: '5 hours',
      campaign: 'new campaign 1',
      link,
    },
    handleDismiss,
    handleClick,
  };
};

const getPropsByType = (type?: string) => {
  return {
    notification: {
      text: 'notification 2',
      id: '2',
      date: '3 days',
      campaign: 'new campaign 2',
      type,
    },
    handleDismiss,
  };
};

const renderView = setupRtl(NotificationItemNew, notificationProps);

describe('NotificationItemNew', () => {
  it('renders a link if an href is specified', () => {
    const { view } = renderView(getPropsByLink(linkHref));
    const href = view.getByRole('link').getAttribute('href');
    expect(href).toStrictEqual(linkHref);
  });

  it('calls handleClick upon clicking a link', () => {
    const { view } = renderView(getPropsByLink(linkHref));
    view.getByRole('link').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not render a link if no href is specified', () => {
    const { view } = renderView(getPropsByLink());
    expect(view.queryByRole('link')).toBeFalsy();
  });

  it('can be dismissed', () => {
    const { view } = renderView(getPropsByLink());
    view.getByRole('button').click();
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('renders the New icon for curriculum notifications', () => {
    const { view } = renderView(getPropsByType('curriculum_blast'));
    view.getByTitle('New Icon');
  });

  it('renders the Megaphone icon for marketing notifications', () => {
    const { view } = renderView(getPropsByType('marketing_blast'));
    view.getByTitle('Megaphone Icon');
  });

  it('renders the default icon for notifications without type specified', () => {
    const { view } = renderView(getPropsByType());
    view.getByTitle('Bell Icon');
  });

  it('renders the chatbox icon for forum comment notifications', () => {
    const { view } = renderView(getPropsByType('forum_comment'));
    view.getByTitle('ChatBox Icon');
  });

  it('renders the envelope icon for forum message notifications', () => {
    const { view } = renderView(getPropsByType('forum_message'));
    view.getByTitle('Envelope Icon');
  });

  it('renders the heart icon for forum like notifications', () => {
    const { view } = renderView(getPropsByType('forum_like'));
    view.getByTitle('Heart Icon');
  });

  it('renders an image if image is provided', () => {
    const { view } = renderView();
    expect(view.getByRole('img')).toHaveAttribute('src', imageUrl);
  });
});
