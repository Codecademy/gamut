import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Bell } from '@codecademy/gamut-illustrations';
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
        <Bell height={48} width={48} />
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
              aria-label="dismiss notificiation"
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
