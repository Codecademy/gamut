import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Code.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const Code = (props) => {
  const CodeClassName = cx(s.Code, props.className);

  return <code {...props} className={CodeClassName}>{props.children}</code>;
};

Code.propTypes = propTypes;

export default Code;
