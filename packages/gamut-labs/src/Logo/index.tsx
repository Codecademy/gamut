import { SVGProps } from 'react';

import { CodecademyLogo } from './CodecademyLogo';
import { CodecademyPremiumLogo } from './CodecademyPremiumLogo';
import { CodecademyProAltLogo } from './CodecademyProAltLogo';
import { CodecademyProgramLogo } from './CodecademyProgramLogo';
import { CodecademyProLockupLogo } from './CodecademyProLockupLogo';
import { CodecademyProLogo } from './CodecademyProLogo';
import { CodecademyProMonoLogo } from './CodecademyProMonoLogo';

const defaultProps: LogoProps = {
  height: 32,
  type: 'default',
};

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
  type: LogoType;
};

export function Logo({ type, ...props }: LogoProps) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

Logo.defaultProps = defaultProps;
