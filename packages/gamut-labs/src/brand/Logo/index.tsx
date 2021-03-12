import { VisualTheme } from '@codecademy/gamut';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { SVGProps } from 'react';

import { CodecademyLogo } from './CodecademyLogo';
import { CodecademyMiniLogo } from './CodecademyMiniLogo';
import { CodecademyProLogo } from './CodecademyProLogo';

const logos = {
  pro: CodecademyProLogo,
  default: CodecademyLogo,
  mini: CodecademyMiniLogo,
};

export type LogoType = keyof typeof logos;

export type LogoProps = SVGProps<SVGSVGElement> & {
  height?: number;
  width?: number;
  variant: LogoType;
  mode?: VisualTheme;
};

const modes = {
  light: { background: 'white', foreground: 'navy', accent: 'hyper' },
  dark: { background: 'navy', foreground: 'white', accent: 'white' },
} as const;

const LogoSvg: React.FC<LogoProps> = ({ variant, ...props }) => {
  const LogoTag = logos[variant] || CodecademyLogo;
  return <LogoTag {...props} />;
};

export const Logo = styled
  .svg<LogoProps>(({ theme, mode = 'light', variant = 'default' }) => {
    const { background, foreground, accent } = modes[mode];
    return css`
      color: ${theme.colors[foreground]};
      background-color: ${theme.colors[background]};

      path {
        fill: currentColor;

        &:last-child {
          fill: ${variant === 'pro' ? theme.colors[accent] : 'currentColor'};
        }
      }
    `;
  })
  .withComponent(LogoSvg);

Logo.defaultProps = { height: 30 };
