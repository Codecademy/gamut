import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Bell, Megaphone, New } from '@codecademy/gamut-illustrations';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import { Box, FlexBox, IconButton, Text } from '..';
import { Notification } from '../NotificationList/typings';

const StyledLink = styled.a`
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors['gray-100']};
  }
`;

const StyledImg = styled.img`
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.navy};
  height: 3rem;
  width: 3rem;
`;

const DateText = styled(Text)`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors['gray-600']};
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

  const dismissNotification = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleDismiss && handleDismiss();
  };

  const getIcon = () => {
    if (imageUrl) {
      return <StyledImg src={imageUrl} alt="" />;
    }
    if (type === 'marketing_blast') {
      return <Megaphone aria-hidden height={48} width={48} />;
    }
    if (type === 'curriculum_blast') {
      return <New aria-hidden height={48} width={48} />;
    }
    return <Bell aria-hidden height={48} width={48} />;
  };

  const renderNotificationContent = (): ReactElement => {
    return (
      <FlexBox paddingY={24} justifyContent="space-between" paddingX={32}>
        {getIcon()}
        <Box flexBasis={0} flexGrow={1} paddingLeft={12} textColor="navy">
          <Text as="span" fontSize="sm">
            {text}
          </Text>
          <DateText as="span" fontSize="sm">
            {date}
          </DateText>
        </Box>
        {handleDismiss && (
          <FlexBox alignSelf="end" paddingLeft={8}>
            <IconButton
              icon={MiniDeleteIcon}
              color={colors.navy}
              onClick={dismissNotification}
              aria-label="dismiss notification"
              size="small"
              variant="secondary"
            />
          </FlexBox>
        )}
      </FlexBox>
    );
  };

  return (
    <>
      {link ? (
        <StyledLink
          href={link}
          aria-label={`${text}, ${date} ago`}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(event) => handleClick?.(event)}
        >
          {renderNotificationContent()}
        </StyledLink>
      ) : (
        <div aria-label={`${text}, ${date} ago`}>
          {renderNotificationContent()}
        </div>
      )}
    </>
  );
};
