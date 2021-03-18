import { Anchor, Box } from '@codecademy/gamut';
import { css } from '@emotion/react';
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
};

const AppHeaderLink = styled(Anchor)(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    &:first-of-type {
      border-top: 1px solid ${theme.colors['gray-400']};
      margin-top: ${theme.spacing[8]};
    }
  `
);

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
  topSeparator = false,
}) => {
  const Icon = item.icon;

  return (
    <AppHeaderLink
      data-intellimize={item.dataIntellimizeId}
      data-testid={item.dataTestId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
      variant="interface"
      paddingY={(16 + (topSeparator ? 8 : 0)) as 24 | 16}
      lineHeight="base"
      textAlign="left"
    >
      {Icon && (
        <Box display="flex" alignContent="center" marginRight={16}>
          <Icon size={24} aria-hidden />
        </Box>
      )}
      {item.text}
    </AppHeaderLink>
  );
};
