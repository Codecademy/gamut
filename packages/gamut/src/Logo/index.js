import React from 'react';
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
function Logo({ type, ...props }) {
  const LogoTag = logos[type] || CodecademyLogo;
  return React.createElement(LogoTag, Object.assign({}, props));
}
Logo.defaultProps = defaultProps;
export default Logo;
//# sourceMappingURL=index.js.map
