import { CloseIcon } from '@codecademy/gamut-icons';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox, Text } from '..';
import { Notification } from '../NotificationList/typings';

const StyledLink = styled.a``;

const IconButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.navy};
  }
`;

const DateText = styled(Text)`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors['gray-600']};
`;
export type NotificationItemNewProps = {
  handleDismiss?: () => void;
  notification: Notification;
  onClick?: (event: object) => void; // tracking function
};

export const NotificationItemNew: React.FC<NotificationItemNewProps> = ({
  handleDismiss,
  notification,
  onClick,
}) => {
  const { date, link, text } = notification;

  // if link: return div w/ styled Anchor
  // if not a link, return div
  return (
    <>
      {link ? (
        <div>Link</div>
      ) : (
        <div>
          <FlexBox paddingY={24} justifyContent="space-between">
            <Box>
              <Text as="span">{text}</Text>
              <DateText as="span">{date}</DateText>
            </Box>
            {handleDismiss && (
              <IconButton
                color={colors.navy}
                onClick={() => handleDismiss()}
                aria-label="dismiss notificiation"
              >
                <CloseIcon height={7.5} width={7.5} />
              </IconButton>
            )}
          </FlexBox>
        </div>
      )}
    </>
  );
};
