import { Anchor, Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, useCallback } from 'react';
import * as React from 'react';

import { GlobalFooterClickHandler } from './types';

export const FooterLinkItems = styled(Box)`
  list-style-type: none;
`;

FooterLinkItems.defaultProps = {
  as: 'ul',
  pl: 0,
  mb: 0,
};

export const FooterLinkItem = styled.li`
  font-size: 0.875rem;
  margin: 0.5rem 0;

  ${theme.breakpoints.sm} {
    font-size: 1rem;
    margin: 0.25rem 0;
  }

  ${theme.breakpoints.md} {
    margin: 0.15rem 0;
  }
`;

export const FooterLinkItemWithAnchor: React.FC<
  ComponentProps<typeof Anchor> & {
    trackingTarget: string;
    footerOnClick: GlobalFooterClickHandler;
  }
> = ({ trackingTarget, footerOnClick, ...anchorProps }) => {
  const anchorOnClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      footerOnClick({ event, target: trackingTarget });
    },
    [footerOnClick, trackingTarget]
  );

  return (
    <FooterLinkItem>
      <Anchor {...anchorProps} onClick={anchorOnClick} />
    </FooterLinkItem>
  );
};
