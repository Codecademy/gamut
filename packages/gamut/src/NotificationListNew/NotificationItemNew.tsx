import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import {
  Bell,
  ChatBox,
  Envelope,
  Heart,
  Megaphone,
  New,
} from '@codecademy/gamut-illustrations';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import { Box, FlexBox, IconButton } from '..';
import { Notification } from '../NotificationList/typings';
import { NewText } from '../Typography/Text';

const StyledLink = styled.a`
  text-decoration: none;
  display: block;
  z-index: 1;
  &:before,
  &:after {
    top: -1px;
    left: 0;
    z-index: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: calc(100% + 2px);
    transition: background 250ms;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    &:after {
      border-radius: 4px;
      border: 2px solid ${({ theme }) => theme.colors.navy};
    }
  }
  &:hover {
    text-decoration: none;
    &:before {
      background-color: ${({ theme }) => theme.colors['gray-100']};
    }
  }
`;

const StyledImg = styled.img`
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.navy};
  height: 3rem;
  width: 3rem;
`;

export type NotificationItemNewProps = {
  notification: Notification;
  handleClick?: (event: object) => void;
  handleDismiss?: () => void;
};

export const NotificationItemNew: React.FC<NotificationItemNewProps> = ({
  handleDismiss,
  notification,
  handleClick,
}) => {
  const { date, imageUrl, link, text, type } = notification;

  const renderIcon = () => {
    if (imageUrl) {
      return <StyledImg src={imageUrl} alt="" />;
    }
    if (type === 'marketing_blast') {
      return <Megaphone aria-hidden height={48} width={48} />;
    }
    if (type === 'curriculum_blast') {
      return <New aria-hidden height={48} width={48} />;
    }
    if (type === 'forum_comment') {
      return <ChatBox aria-hidden height={48} width={48} />;
    }
    if (type === 'forum_message') {
      return <Envelope aria-hidden height={48} width={48} />;
    }
    if (type === 'forum_like') {
      return <Heart aria-hidden height={48} width={48} />;
    }
    return <Bell aria-hidden height={48} width={48} />;
  };

  const notificationContent: ReactElement = (
    <FlexBox zIndex={1} position="relative">
      {renderIcon()}
      <Box flexBasis={0} flexGrow={1} paddingLeft={12}>
        <NewText as="span">{text}</NewText>
        <NewText as="span" marginLeft={4} textColor="gray-600">
          {date}
        </NewText>
      </Box>
    </FlexBox>
  );

  const dismissIcon: ReactElement = (
    <IconButton
      icon={MiniDeleteIcon}
      color={colors.navy}
      onClick={handleDismiss}
      aria-label="dismiss notification"
      size="small"
      variant="secondary"
      z-index={1}
    />
  );

  return (
    <FlexBox
      paddingY={24}
      paddingX={32}
      alignItems="flex-start"
      justifyContent="space-between"
      position="relative"
    >
      {link ? (
        <>
          <StyledLink
            href={link}
            aria-label={`${text}, ${date} ago`}
            rel="noopener noreferrer"
            target="_blank"
            onClick={(event) => handleClick?.(event)}
          >
            {notificationContent}
          </StyledLink>
        </>
      ) : (
        <>{notificationContent}</>
      )}
      <FlexBox alignItems="flex-start" zIndex={1}>
        {handleDismiss && dismissIcon}
      </FlexBox>
    </FlexBox>
  );
};
