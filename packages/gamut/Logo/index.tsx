import React from 'react';
import CodecademyLogo from './CodecademyLogo';
import CodecademyProLogo from './CodecademyProLogo';
import CodecademyProAltLogo from './CodecademyProAltLogo';
import CodecademyProgramLogo from './CodecademyProgramLogo';

const defaultProps = {
  height: 32,
  type: 'default',
};

const logos = {
  pro: CodecademyProLogo,
  proAlt: CodecademyProAltLogo,
  program: CodecademyProgramLogo,
  default: CodecademyLogo,
};

export type LogoProps = {
  height?: number;
  width?: number;
  type: 'default' | 'pro' | 'proAlt' | 'program';
};

function Logo({ type, ...props }: LogoProps) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

Logo.defaultProps = defaultProps;

export default Logo;
