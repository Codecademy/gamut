import { Anchor } from '@codecademy/gamut';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
};

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
}) => {
  return (
    <Anchor
      data-testid={item.dataTestId}
      href={item.href}
      fontWeight="normal"
      lineHeight="base"
      minWidth="0"
      onClick={(event) => action(event, item)}
      py={8}
      role="link"
      target={item.newTab ? 'blank' : ''}
      textAlign="left"
      variant="interface"
      whiteSpace="nowrap"
    >
      {item.text}
    </Anchor>
  );
};
