import React, { SVGProps } from 'react';

import CodecademyLogo from './CodecademyLogo';
import CodecademyProLogo from './CodecademyProLogo';
import CodecademyProAltLogo from './CodecademyProAltLogo';
import CodecademyProgramLogo from './CodecademyProgramLogo';
import CodecademyProLockupLogo from './CodecademyProLockupLogo';
import CodecademyProMonoLogo from './CodecademyProMonoLogo';
import CodecademyPremiumLogo from './CodecademyPremiumLogo';

const logos = {
  pro: CodecademyProLogo,
  proAlt: CodecademyProAltLogo,
  proLockup: CodecademyProLockupLogo,
  proMono: CodecademyProMonoLogo,
  program: CodecademyProgramLogo,
  premium: CodecademyPremiumLogo,
  default: CodecademyLogo,
};

export type LogoType =
  | 'default'
  | 'pro'
  | 'proAlt'
  | 'proLockup'
  | 'program'
  | 'proMono'
  | 'premium';

export type LogoProps = SVGProps<SVGSVGElement> & {
  height?: number;
  width?: number;
  type?: LogoType;
};

export function Logo({ height = 32, type = 'default', ...props }: LogoProps) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

export default Logo;
