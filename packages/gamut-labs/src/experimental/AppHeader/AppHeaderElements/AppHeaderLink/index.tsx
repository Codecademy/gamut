import { Anchor, Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { focusStyles } from '../SharedStyles';
import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

const AppHeaderLinkButtonOuter = styled(Anchor)(({ theme }) => {
  return `
  color: ${theme.colors.navy};
  text-decoration: none;
  display: block;
  &:hover {
    color: ${theme.colors.hyper};
    text-decoration: none;
  }
  ${focusStyles}
`;
});

const AppHeaderLinkButtonInner = styled(Box)`
  white-space: nowrap;
`;

export type AppHeaderLinkProps = {
  item: AppHeaderLinkItem;
  onClick: AppHeaderClickHandler;
};

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  item,
  onClick,
}) => {
  return (
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
      >
        {item.text}
      </AppHeaderLinkButtonInner>
    </AppHeaderLinkButtonOuter>
  );
};
