import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef, HTMLProps } from 'react';
/**
 *
 * This element safely resets the stacking context with limited side effects.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 *
 * **WARNING**: Please do not change the values of position or z-index here or extend this component with overrides
 * to these properties as it will no longer guarantee a predictable behavior
 */

export const AppWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

/** This is a special element specifically for GlobalPage */

const RestrictedBackground = forwardRef<
  HTMLDivElement,
  Pick<ComponentProps<typeof Background>, 'bg'> & HTMLProps<HTMLDivElement>
>(({ bg, className, children }, ref) => (
  <Background bg={bg} className={className} ref={ref}>
    {children}
  </Background>
));

export const PageWrapper = AppWrapper.withComponent(RestrictedBackground);
