import React from 'react';
import PropTypes from 'prop-types';
import CodecademyLogo from './CodecademyLogo';
import CodecademyProLogo from './CodecademyProLogo';
import CodecademyProgramLogo from './CodecademyProgramLogo';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  type: PropTypes.oneOf(['pro', 'program', 'default']).isRequired,
};

const defaultProps = {
  height: 32,
  type: 'default',
};

function Logo({ type, ...props }) {
  if (type === 'pro') {
    return <CodecademyProLogo {...props} />;
  } else if (type === 'program') {
    return <CodecademyProgramLogo {...props} />;
  }

  return <CodecademyLogo {...props} />;
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
