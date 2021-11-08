import { ColorModes, styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

export type LogoProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof logoStyles> & {
    height?: number;
    width?: number;
    mode?: ColorModes;
  };

const logoStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export const LogoSvg = styled('svg', styledOptions<'svg'>())<
  Omit<LogoProps, 'variant'>
>(system.css({ textColor: 'currentColor' }), logoStyles);
