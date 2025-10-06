import { styledOptions, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

import { WithChildrenProp } from '../utils';

const positionVariants = variant({
  prop: 'position',
  base: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  variants: {
    left: {
      flex: 1,
    },
    right: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    center: {
      flex: 2,
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
});

export interface AppBarSectionProps
  extends StyleProps<typeof positionVariants>,
    WithChildrenProp {}

const StyledSection = styled(
  'div',
  styledOptions
)<AppBarSectionProps>(positionVariants);

export const AppBarSection: React.FC<AppBarSectionProps> = ({
  position,
  children,
}) => {
  return <StyledSection position={position}>{children}</StyledSection>;
};
