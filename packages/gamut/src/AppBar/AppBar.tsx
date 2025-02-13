import * as React from 'react';

import { ContentContainer } from '../ContentContainer';
import { WithChildrenProp } from '../utils';

export interface AppBarProps
  extends WithChildrenProp,
    Pick<React.ComponentProps<typeof ContentContainer>, 'aria-label' | 'as'> {
  /**
   * Whether the container should be larger than the default content size.
   */
  wide?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  'aria-label': ariaLabel,
  as,
  wide,
  children,
}) => {
  return (
    <ContentContainer
      aria-label={ariaLabel}
      as={as}
      display="flex"
      alignItems="center"
      height="100%"
      size={wide ? 'wide' : 'medium'}
      zIndex={14}
    >
      {children}
    </ContentContainer>
  );
};
