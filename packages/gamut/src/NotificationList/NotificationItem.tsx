import { colors, fontSize, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Markdown } from '../Markdown';
import { NotificationIcon } from './NotificationIcon';
import { Notification } from './typings';

export type NotificationItemProps = {
  onClick?: (event: object) => void;
  notification: Notification;
};

const notificationStyles = `
  align-items: flex-start;
  background: none;
  border: none;
  color: ${colors.black};
  display: flex;
  font-size: ${fontSize[14]};
  padding: ${spacing[24]} ${spacing[16]};
  text-align: left;
  width: 100%;

  &:not(:first-of-type) {
    border-top: 1px solid ${colors.black};
  }

  &:hover {
    text-decoration: none;
  }
`;

const NotificationLink = styled.a(notificationStyles);
const NotificationButton = styled.button(notificationStyles);

const Date = styled.span`
  color: ${colors['gray-600']};
  display: inline-block;
`;

const CallToAction = styled.div`
  color: ${colors.hyper};
  font-weight: bold;
  margin-top: ${spacing[8]};
`;

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  const {
    cta,
    date,
    iconSettings,
    iconSlug,
    imageUrl,
    link,
    text,
    /* unread, */
  } = notification;

  const [TagName, tagProps] = link
    ? ([
        NotificationLink,
        { href: link, rel: 'noopener noreferrer', target: '_blank' },
      ] as const)
    : ([NotificationButton, { type: 'button' }] as const);

  return (
    <TagName onClick={onClick} {...tagProps}>
      <NotificationIcon
        iconSettings={iconSettings}
        iconSlug={iconSlug}
        imageUrl={imageUrl}
      />
      <div>
        <Markdown inline spacing="none" text={text} /> <Date>{date}</Date>
        {cta && <CallToAction>{cta}</CallToAction>}
      </div>
    </TagName>
  );
};
