import { Anchor, BadgeProps, Box, FlexBox } from '@codecademy/gamut';
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
  badge?: React.FunctionComponent<BadgeProps>;
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

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
  topSeparator = false,
  badge,
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
            {item.text} {badge}
          </FlexBox>
        </Anchor>
      </SeparatorInner>
    </SeparatorOuter>
  );
};
