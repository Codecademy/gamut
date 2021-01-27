import { Anchor, Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';

import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderLinkMobileProps = {
  arrowButton?: boolean;
  item: AppHeaderLinkItem;
  onClick: AppHeaderClickHandler;
  topSeparator?: boolean;
};

type AppHeaderLinkButtonProps = { topSeparator: boolean };

const SeparatorOuter = styled(Box)<AppHeaderLinkButtonProps>`
  border-top: ${({ theme, topSeparator }) =>
    topSeparator ? `1px solid ${theme.colors['gray-400']}` : ''};
  margin-top: ${({ topSeparator }) => (topSeparator ? '0.5rem' : '')};
`;

const SeparatorInner = styled(Box)<AppHeaderLinkButtonProps>`
  margin-top: ${({ topSeparator }) => (topSeparator ? '0.5rem' : '')};
`;

const AppHeaderLinkButtonOuter = styled(Anchor)`
  padding: 0.5px 0;
  color: ${({ theme }) => theme.colors.navy};
  text-decoration: none;
  display: block;
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  white-space: nowrap;
`;

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  onClick,
  item,
}) => {
  const Icon = item.icon;
  const topSeparator = item.topSeparator || false;

  return (
    <SeparatorOuter topSeparator={topSeparator}>
      <SeparatorInner topSeparator={topSeparator}>
        <AppHeaderLinkButtonOuter
          data-testid={item.dataTestId}
          href={item.href}
          onClick={(event: React.MouseEvent) => onClick(event, item)}
          variant="interface"
        >
          <AppHeaderLinkButtonInner
            lineHeight="base"
            minWidth="0"
            paddingY={8}
            textAlign="left"
            display="flex"
          >
            {Icon && (
              <Box display="flex" alignContent="center" marginRight={16}>
                <Icon size={24} aria-hidden />
              </Box>
            )}
            {item.text}
          </AppHeaderLinkButtonInner>
        </AppHeaderLinkButtonOuter>
      </SeparatorInner>
    </SeparatorOuter>
  );
};
