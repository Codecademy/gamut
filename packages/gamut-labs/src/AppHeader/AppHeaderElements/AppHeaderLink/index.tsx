import { Anchor, AnchorProps } from '@codecademy/gamut';
import React from 'react';

import { appHeaderMobileBreakpoint } from '../../shared';
import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
  showIcon?: boolean;
  tabIndex?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
} & AnchorProps;

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
  showIcon = false,
  mx = { _: 0, [appHeaderMobileBreakpoint]: 24 },
  py = { _: 16, [appHeaderMobileBreakpoint]: 8 },
  onKeyDown,
  ...props
}) => {
  const Icon = item.icon;

  return (
    <Anchor
      data-testid={item.dataTestId}
      href={item.href}
      onClick={(event) => action(event, item)}
      onKeyDown={onKeyDown}
      role="menuitem"
      target={item.newTab ? 'blank' : ''}
      variant="interface"
      alignContent="center"
      alignItems="center"
      display="flex"
      fontWeight="normal"
      lineHeight="base"
      minWidth="0"
      textAlign="left"
      whiteSpace="nowrap"
      mx={mx}
      py={py}
      {...props}
    >
      {showIcon && Icon && <Icon mr={16} size={24} aria-hidden />}
      {item.text}
      {item.badge}
    </Anchor>
  );
};
