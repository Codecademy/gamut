import { Anchor, Box } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { focusStyles } from '../../AppHeader/styles';
import { AppHeaderLink } from '../../AppHeader/types';
import { HeaderClickHandler } from '../../GlobalHeader';

const AppHeaderLinkButtonOuter = styled(Anchor)`
  color: ${colors.navy};
  text-decoration: none;
  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
  }
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  white-space: nowrap;
`;

export type AppHeaderLinkElementProps = {
  item: AppHeaderLink;
  onClick: HeaderClickHandler;
};

export const AppHeaderLinkElement: React.FC<AppHeaderLinkElementProps> = ({
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
