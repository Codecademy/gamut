import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
};

const Link = styled(Anchor)`
  white-space: nowrap;
`;

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
}) => {
  return (
    <Link
      data-testid={item.dataTestId}
      data-intellimize={item.dataIntellimizeId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
      variant="interface"
      lineHeight="base"
      paddingY={8}
      textAlign="left"
    >
      {item.text}
    </Link>
  );
};
