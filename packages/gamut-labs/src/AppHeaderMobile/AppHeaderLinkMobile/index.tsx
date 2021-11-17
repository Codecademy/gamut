import { Anchor, Badge, Box, FlexBox } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderLinkMobileProps = {
  item: AppHeaderLinkItem;
  action: AppHeaderClickHandler;
  topSeparator?: boolean;
  newBadge?: boolean;
};

type AppHeaderLinkButtonProps = { topSeparator: boolean };

const SeparatorOuter = styled(Box)<AppHeaderLinkButtonProps>`
  border-top: ${({ theme, topSeparator }) =>
    topSeparator ? `1px solid ${theme.colors['gray-600']}` : ''};
  margin-top: ${({ topSeparator }) => (topSeparator ? '0.5rem' : '')};
`;

const SeparatorInner = styled(Box)<AppHeaderLinkButtonProps>`
  margin-top: ${({ topSeparator }) => (topSeparator ? '0.5rem' : '')};
`;

export const StyledBadge = styled(Badge)`
  font-size: 10px;
  padding-top: 1px;
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  width: 36px;
  border-radius: 16px;
`;

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
  topSeparator = false,
  newBadge = false,
}) => {
  const Icon = item.icon;

  return (
    <SeparatorOuter topSeparator={topSeparator}>
      <SeparatorInner topSeparator={topSeparator}>
        <Anchor
          data-testid={item.dataTestId}
          href={item.href}
          fontWeight="normal"
          onClick={(event) => action(event, item)}
          role="link"
          target={item.newTab ? 'blank' : ''}
          variant="interface"
          width="100%"
        >
          <FlexBox
            lineHeight="base"
            minWidth="0"
            py={16}
            whiteSpace="nowrap"
            textAlign="left"
            display="flex"
            alignContent="center"
          >
            {Icon && (
              <FlexBox alignContent="center" mr={16}>
                <Icon size={24} aria-hidden />
              </FlexBox>
            )}
            {item.text}{' '}
            {newBadge && (
              <StyledBadge
                round
                variant="blue"
                fontFamily="accent"
                ml={8}
                pl={8}
                pr={8}
                height={16}
                alignSelf="center"
              >
                New
              </StyledBadge>
            )}
          </FlexBox>
        </Anchor>
      </SeparatorInner>
    </SeparatorOuter>
  );
};
