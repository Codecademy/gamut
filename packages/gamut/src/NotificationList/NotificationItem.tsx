import {
  GamutIconProps,
  MiniDeleteIcon,
  MultipleUsersIcon,
} from '@codecademy/gamut-icons';
import {
  Bell,
  ChatBox,
  EmailAt,
  Envelope,
  Heart,
  IllustrationProps,
  Megaphone,
  New,
} from '@codecademy/gamut-illustrations';
import { CheckerDense } from '@codecademy/gamut-patterns';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
import * as React from 'react';

import { Box, FlexBox, IconButton, Text } from '..';
import { Notification } from './typings';

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
      border: 2px solid ${themed('colors.navy')};
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
  border: 1px solid ${themed('colors.navy')};
  height: 3rem;
  width: 3rem;
`;

const isInternalLink = (href: string) => {
  try {
    return new URL(href).hostname === window.location.hostname;
  } catch (e) {}
  return false;
};

export type NotificationItemProps = {
  notification: Notification;
  handleClick?: (event: object) => void;
  handleDismiss?: () => void;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  handleDismiss,
  notification,
  handleClick,
}) => {
  const { date, imageUrl, link, text, type, id } = notification;
  const notificationItemId = `NotificationItem${id}`;

  const renderIllustration = (Illustration: React.FC<IllustrationProps>) => (
    <Box display="inline-flex" aria-hidden>
      <Illustration height={48} width={48} />
    </Box>
  );

  const renderIcon = (Icon: React.FC<GamutIconProps>) => (
    <Box
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      border={1}
      width={50}
      height={50}
      aria-hidden
    >
      <Icon height={22} width={22} />
    </Box>
  );

  const renderImage = () => {
    if (imageUrl) return <StyledImg src={imageUrl} alt="" />;

    switch (type) {
      case 'marketing_blast':
        return renderIllustration(Megaphone);
      case 'curriculum_blast':
        return renderIllustration(New);
      case 'cohort_blast':
        return renderIcon(MultipleUsersIcon);
      case 'forum_comment':
        return renderIllustration(ChatBox);
      case 'forum_message':
        return renderIllustration(Envelope);
      case 'forum_like':
        return renderIllustration(Heart);
      case 'forum_mention':
        return renderIllustration(EmailAt);
      default:
        return renderIllustration(Bell);
    }
  };

  const notificationContent: ReactElement = (
    <FlexBox zIndex={1} position="relative" textColor="text">
      {renderImage()}
      <Box flex={1} pl={12}>
        <Text id={notificationItemId} variant="p-small">
          {text}
        </Text>
        <Text variant="p-small" textColor="gray-600" ml={4}>
          {date}
        </Text>
      </Box>
    </FlexBox>
  );

  const dismissIcon: ReactElement = (
    <IconButton
      icon={MiniDeleteIcon}
      onClick={handleDismiss}
      aria-label="Dismiss Notification"
      aria-describedby={notificationItemId}
      size="small"
      variant="secondary"
      z-index={1}
    />
  );

  const separatorPattern = (
    <Box px={32} m={0} aria-hidden="true">
      <CheckerDense height="1px" display="flex" />
    </Box>
  );

  return (
    <li>
      <FlexBox
        py={24}
        px={32}
        alignItems="flex-start"
        justifyContent="space-between"
        position="relative"
      >
        {link ? (
          <>
            <StyledLink
              href={link}
              aria-label={`${text}, ${date} ago`}
              rel={isInternalLink(link) ? '' : 'noopener noreferrer'}
              target={isInternalLink(link) ? '' : '_blank'}
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
      {separatorPattern}
    </li>
  );
};
