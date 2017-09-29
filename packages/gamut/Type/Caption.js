import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Caption.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const Caption = (props) => {
  const CaptionClassName = cx(s.Caption, props.className);

  return <p {...props} className={CaptionClassName}>{props.children}</p>;
};

Caption.propTypes = propTypes;

export default Caption;
