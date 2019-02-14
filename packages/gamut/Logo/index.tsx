import React from 'react';
import PropTypes from 'prop-types';
import CodecademyLogo from './CodecademyLogo';
import CodecademyProLogo from './CodecademyProLogo';
import CodecademyProAltLogo from './CodecademyProAltLogo';
import CodecademyProgramLogo from './CodecademyProgramLogo';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  type: PropTypes.oneOf(['pro', 'proAlt', 'program', 'default']).isRequired,
};

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

function Logo({ type, ...props }) {
  const LogoTag = logos[type] || CodecademyLogo;
  return <LogoTag {...props} />;
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
