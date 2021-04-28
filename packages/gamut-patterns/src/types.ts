import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

const patternStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export const PatternSvg = styled.svg(patternStyles);
// Typeforward valid SVG attrs.
export type PatternComponent = SVGProps<SVGSVGElement> &
  React.FC<React.ComponentProps<typeof PatternSvg>>;
