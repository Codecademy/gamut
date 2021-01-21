import { Anchor, Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { focusStyles } from '../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderLinkItem } from '../AppHeader/AppHeaderElements/types';

type AppHeaderLinkMobileProps = {
  arrowButton?: boolean;
  onClick: (event: React.MouseEvent) => {};
  item: AppHeaderLinkItem;
};

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

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  onClick,
  item,
}) => {
  const Icon = item.icon;

  return (
    <div aria-label={item.text}>
      <AppHeaderLinkButtonOuter
        data-testid={item.dataTestId}
        href={item.href}
        onClick={(event: React.MouseEvent) => onClick(event)}
        variant="interface"
      >
        <AppHeaderLinkButtonInner
          lineHeight="base"
          minWidth="0"
          paddingY={8}
          textAlign="left"
          display="flex"
        >
          {Icon && (
            <Box display="flex" alignContent="center" marginRight={16}>
              <Icon size={24} aria-hidden />
            </Box>
          )}
          {item.text}
        </AppHeaderLinkButtonInner>
      </AppHeaderLinkButtonOuter>
    </div>
  );
};
