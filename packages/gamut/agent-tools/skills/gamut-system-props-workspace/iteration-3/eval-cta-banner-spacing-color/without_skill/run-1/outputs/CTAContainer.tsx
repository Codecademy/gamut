import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * CTAContainer
 *
 * A `FlexBox` used to group call-to-action content (e.g. on the Teams
 * landing page) so it can be layered on top of a decorative background
 * pattern. Applies a consistent 12px gap between children, a semantic
 * surface background color, rounded corners, and a stacking context so
 * the content stays legible above the pattern behind it.
 *
 * All standard `FlexBox` system props can still be passed to override or
 * extend these defaults.
 */
export const CTAContainer = styled(FlexBox)<FlexBoxProps>(
  css({
    gap: 12,
    bg: 'background-primary',
    borderRadius: 'lg',
    position: 'relative',
    zIndex: 2,
  })
);

export type CTAContainerProps = FlexBoxProps;
