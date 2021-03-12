import { Anchor, Box } from '@codecademy/gamut';
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

type AppHeaderLinkButtonProps = { topSeparator: boolean };

const SeparatorOuter = styled(Box)<AppHeaderLinkButtonProps>`
  border-top: ${({ theme, topSeparator }) =>
    topSeparator ? `1px solid ${theme.colors['gray-400']}` : ''};
  margin-top: ${({ topSeparator }) => (topSeparator ? '0.5rem' : '')};

  ${Anchor} {
    display: flex;
    width: 100%;
  }
`;

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
  topSeparator = false,
}) => {
  const Icon = item.icon;

  return (
    <SeparatorOuter topSeparator={topSeparator}>
      <Anchor
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
      </Anchor>
    </SeparatorOuter>
  );
};
