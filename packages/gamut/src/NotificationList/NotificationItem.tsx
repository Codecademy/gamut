import React from 'react';
import { format } from 'date-fns';
import { Truncate } from '../Truncate';
import { Notification } from './typings';
import { NotificationIcon } from './NotificationIcon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Text } from '../Typography';

export type NotificationItemProps = {
  onClick?: (event: object) => void;
  notification: Notification;
};

const formatTime = (notificationDate: string): string =>
  format(new Date(notificationDate), 'MMM d, yyyy');

const NotificationMessage = styled(Text)`
  max-height: 4rem;
  overflow: hidden;
`;
const NotificationTime = styled(Text)`
  color: ${({ theme }) => theme.colors['gray-700']};
`;

const NotificationItemElement = styled.div<{ isActive?: boolean }>`
  background: none;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[24]}`};
  display: flex;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: $color-black;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors['gray-200']};
  text-align: left;
  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        background-color: rgba(${theme.colors.blue} 0.1);

        ${NotificationTime} {
          color: ${theme.colors['gray-700']};
        }
      `;
    }
    return '';
  }}

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    text-decoration: none;
  }
`;

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { notification, onClick } = props;
  const {
    date,
    iconSettings,
    iconSlug,
    imageUrl,
    link,
    text,
    unread,
  } = notification;

  const itemProps = link
    ? ({
        as: 'a',
        href: link,
        rel: 'noopener noreferrer',
        target: '_blank',
      } as const)
    : ({ as: 'button', type: 'button' } as const);

  return (
    <NotificationItemElement isActive={unread} {...itemProps} onClick={onClick}>
      <NotificationIcon
        iconSettings={iconSettings}
        iconSlug={iconSlug}
        imageUrl={imageUrl}
      />
      <NotificationMessage>
        <Truncate lines={3}>{text}</Truncate>
      </NotificationMessage>
      <NotificationTime>{formatTime(date)}</NotificationTime>
    </NotificationItemElement>
  );
};
