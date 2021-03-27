import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
};

export const HeaderLink = styled(Anchor)`
  white-space: nowrap;
`;

HeaderLink.defaultProps = {
  variant: 'interface',
  paddingY: 8,
};

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
}) => {
  return (
    <HeaderLink
      data-testid={item.dataTestId}
      data-intellimize={item.dataIntellimizeId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
    >
      {item.text}
    </HeaderLink>
  );
};
