import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { SVGProps } from 'react';

const patternStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export type PatternProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof patternStyles>;
