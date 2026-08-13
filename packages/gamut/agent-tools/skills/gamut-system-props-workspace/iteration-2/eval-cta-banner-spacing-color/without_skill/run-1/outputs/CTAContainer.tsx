import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * CTAContainer
 *
 * A `FlexBox` wrapper for grouping call-to-action content (e.g. heading,
 * copy, and buttons) on the Teams landing page. It sits above a decorative
 * background pattern, so it is positioned with a `z-index` and given its
 * own semantic background so its contents stay legible.
 */
export const CTAContainer = styled(FlexBox)<FlexBoxProps>(
  css({
    gap: 12,
    bg: 'background',
    borderRadius: 'lg',
    position: 'relative',
    zIndex: 2,
  })
);

export type CTAContainerProps = FlexBoxProps;
