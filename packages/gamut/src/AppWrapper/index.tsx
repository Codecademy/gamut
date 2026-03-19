import styled from '@emotion/styled';
import type { ComponentType } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * This element safely resets the stacking context with limited side effects.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 *
 * **WARNING**: Please do not change the values of position or z-index here or extend this component with overrides
 * to these properties as it will no longer guarantee a predictable behavior
 */
const StyledAppWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

/** Props for AppWrapper. Use when wrapping or composing AppWrapper. */
export type AppWrapperProps = ComponentPropsWithoutRef<'div'>;

export const AppWrapper =
  StyledAppWrapper as unknown as ComponentType<AppWrapperProps>;
