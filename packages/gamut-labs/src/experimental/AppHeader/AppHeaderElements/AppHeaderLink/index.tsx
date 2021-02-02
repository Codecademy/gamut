import { Anchor, Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { focusStyles, hoverStyles } from '../SharedStyles';
import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

const AppHeaderLinkButtonOuter = styled(Anchor)`
  color: ${({ theme }) => theme.colors.navy};
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  white-space: nowrap;
`;

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
};

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
}) => {
  return (
    <AppHeaderLinkButtonOuter
      data-testid={item.dataTestId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
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
