import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

const patternStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export type PatternProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof patternStyles>;

export const PatternSvg = styled(
  'svg',
  styledConfig
)<PatternProps>(patternStyles);

// Typeforward valid SVG attrs.
export type PatternComponent = React.ComponentProps<typeof PatternSvg>;
