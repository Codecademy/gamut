import { Box, WithChildrenProp } from '@codecademy/gamut';
import { system, transitionConcat } from '@codecademy/gamut-styles';
import { ResponsiveProp } from '@codecademy/variance';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { useIsInHeaderRegion } from './useIsInHeaderRegion';

const HeaderHeightAreaBase = styled(Box)(
  system.css({
    borderBottom: 1,
    bg: 'background',
    top: 0,
    zIndex: 2,
    width: 1,
    transition: transitionConcat(
      ['background-color', 'border-bottom-color'],
      'fast',
      'ease-in-out'
    ),
  }),
  system.states({
    faded: {
      bg: 'background-current',
      borderColor: 'background-current',
    },
  })
);

export interface HeaderHeightAreaProps extends WithChildrenProp {
  as?: React.ElementType<any>;
  display: ResponsiveProp<'none' | 'block'>;
  ariaLabel?: string;
}

export const HeaderHeightArea: React.FC<HeaderHeightAreaProps> = ({
  as,
  children,
  display,
  ariaLabel,
}) => {
  const theme = useTheme();
  const isInHeaderRegion = useIsInHeaderRegion();

  return (
    <HeaderHeightAreaBase
      as={as}
      display={display}
      height={theme.elements.headerHeight}
      faded={isInHeaderRegion}
      aria-label={ariaLabel}
    >
      {children}
    </HeaderHeightAreaBase>
  );
};
