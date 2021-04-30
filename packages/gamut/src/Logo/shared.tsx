import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

export type LogoProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof logoStyles> & {
    height?: number;
    width?: number;
    mode?: keyof Theme['colorModes']['modes'];
  };

const logoStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export const LogoSvg = styled('svg', styledConfig(['mode', 'varaint']))<
  Omit<LogoProps, 'variant'>
>(system.css({ textColor: 'text' }), logoStyles);

export function useColorMode(mode?: keyof Theme['colorModes']['modes']) {
  const {
    colorModes: { active },
  } = useTheme();

  return mode ?? active;
}
