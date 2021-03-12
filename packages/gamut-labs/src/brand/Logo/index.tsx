import React, { SVGProps } from 'react';

import { CodecademyLogo } from './CodecademyLogo';
import { CodecademyProLogo } from './CodecademyProLogo';
import { CodecademyProMonoLogo } from './CodecademyProMonoLogo';

const defaultProps: LogoProps = {
  height: 32,
  type: 'default',
};

const logos = {
  pro: CodecademyProLogo,
  proMono: CodecademyProMonoLogo,
  default: CodecademyLogo,
};

export type LogoType = keyof typeof logos;

export type LogoProps = SVGProps<SVGSVGElement> & {
  height?: number;
  width?: number;
  type: LogoType;
};

export function Logo({ type, ...props }: LogoProps) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

Logo.defaultProps = defaultProps;
