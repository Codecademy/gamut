import { Anchor, AnchorProps } from '@codecademy/gamut';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
  isMobile?: boolean;
  tabIndex?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
} & AnchorProps;

export const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
  action,
  item,
  isMobile = false,
  px = { _: 0, md: 24 },
  py = { _: 16, md: 8 },
  onKeyDown,
  ...props
}) => {
  const Icon = item.icon;

  return (
    <>
      <Anchor
        data-testid={item.dataTestId}
        href={item.href}
        onClick={(event) => action(event, item)}
        onKeyDown={onKeyDown}
        role="menuitem"
        target={item.newTab ? 'blank' : ''}
        variant="interface"
        alignContent="center"
        display="flex"
        fontWeight="normal"
        lineHeight="base"
        minWidth="0"
        textAlign="left"
        whiteSpace="nowrap"
        px={px}
        py={py}
        {...props}
      >
        {isMobile && Icon && <Icon mr={16} size={24} aria-hidden />}
        {item.text}
        {item.badge}
      </Anchor>
    </>
  );
};
