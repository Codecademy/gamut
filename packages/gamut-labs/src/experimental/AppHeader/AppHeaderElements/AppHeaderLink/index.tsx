import { Anchor } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';

export type AppHeaderLinkProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLinkItem;
};

export const HeaderLink = styled(Anchor)(
  variant({
    prop: 'menuVariant',
    default: 'closed',
    variants: {
      open: {
        letterSpacing: '0px',
        fontWeight: 'title',
      },
      closed: {
        letterSpacing: '0.35px',
      },
    },
  })
);

HeaderLink.defaultProps = {
  whiteSpace: 'nowrap',
  variant: 'interface',
  width: { base: '100%', md: 'auto' },
  paddingY: 12,
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
