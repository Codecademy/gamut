import { CloseIcon } from '@codecademy/gamut-icons';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import { Box, FlexBox, Text } from '..';
import { Notification } from '../NotificationList/typings';
import Bell from './assets/bell.svg';

const StyledLink = styled.a`
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors['gray-100']};
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 0.5rem;
  margin-left: 22px;
  padding: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors['gray-200']};
    cursor: pointer;
  }
`;

const DateText = styled(Text)`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors['gray-600']};
`;

export type NotificationItemNewProps = {
  notification: Notification;
  handleClick: (event: object) => void; // will become tracking function
  handleDismiss?: () => void;
};

export const NotificationItemNew: React.FC<NotificationItemNewProps> = ({
  handleDismiss,
  notification,
  handleClick,
}) => {
  const { date, link, text } = notification;

  const dismissNotification = (event: React.MouseEvent) => {
    event.preventDefault();
    handleDismiss && handleDismiss();
  };

  const renderNotificationContent = (): ReactElement => {
    return (
      <FlexBox paddingY={24} justifyContent="space-between" paddingX={32}>
        <FlexBox>
          <img src={Bell} alt="" height={48} width={48} />
          <Box paddingLeft={12} textColor="navy">
            <Text as="span" fontSize="sm">
              {text}
            </Text>
            <DateText as="span" fontSize="sm">
              {date}
            </DateText>
          </Box>
        </FlexBox>
        {handleDismiss && (
          <FlexBox alignSelf="end" paddingLeft={8}>
            <IconButton
              color={colors.navy}
              onClick={(e) => dismissNotification(e)}
              aria-label="dismiss notificiation"
            >
              <CloseIcon height={10} width={10} />
            </IconButton>
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
          rel="noopener noreferrer"
          target="_blank"
          onClick={(event) => handleClick(event)}
        >
          {renderNotificationContent()}
        </StyledLink>
      ) : (
        <div>{renderNotificationContent()}</div>
      )}
    </>
  );
};
