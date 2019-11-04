import React, { SVGProps } from 'react';
import CodecademyLogo from './CodecademyLogo';
import CodecademyProLogo from './CodecademyProLogo';
import CodecademyProAltLogo from './CodecademyProAltLogo';
import CodecademyProgramLogo from './CodecademyProgramLogo';
import CodecademyProLockupLogo from './CodecademyProLockupLogo';

const defaultProps = {
  height: 32,
  type: 'default',
};

const logos = {
  pro: CodecademyProLogo,
  proAlt: CodecademyProAltLogo,
  proLockup: CodecademyProLockupLogo,
  program: CodecademyProgramLogo,
  default: CodecademyLogo,
};

export type LogoProps = SVGProps<SVGSVGElement> & {
  height?: number;
  width?: number;
  type: 'default' | 'pro' | 'proAlt' | 'proLockup' | 'program';
};

export function Logo({ type, ...props }: LogoProps) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

Logo.defaultProps = defaultProps;

export default Logo;
