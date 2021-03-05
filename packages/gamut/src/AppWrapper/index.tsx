import styled from '@emotion/styled';

/**
 *
 * This element safely resets the stacking context with limited side effects.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 *
 * **WARNING**: Please do not change the values of position or z-index here or extend this component with overrides
 * to these propertiesas it will no longer guarantee a predictable behavior
 */

export const AppWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
