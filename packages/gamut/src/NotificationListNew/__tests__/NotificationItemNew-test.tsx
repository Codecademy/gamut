import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

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

const renderNotificationItemNew = (
  notificationProps: NotificationItemNewProps
) => {
  return render(
    <ThemeProvider theme={theme}>
      <NotificationItemNew {...notificationProps} />
    </ThemeProvider>
  );
};

describe('NotificationItemNew', () => {
  it('renders a link if an href is specified', () => {
    renderNotificationItemNew(linkedNotificationProps);
    const href = screen.getByRole('link').getAttribute('href');
    expect(href).toStrictEqual(linkHref);
  });

  it('calls handleClick upon clicking a link', () => {
    renderNotificationItemNew(linkedNotificationProps);
    screen.getByRole('link').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not render a link if no href is specified', () => {
    renderNotificationItemNew(noLinkNotificationProps);
    expect(screen.queryByRole('link')).toBeFalsy();
  });

  it('can be dismissed', () => {
    renderNotificationItemNew(noLinkNotificationProps);
    screen.getByRole('button').click();
    expect(handleDismiss).toHaveBeenCalled();
  });
});
