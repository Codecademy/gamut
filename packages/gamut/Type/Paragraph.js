import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Paragraph.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const Paragraph = (props) => {
  const ParagraphClassName = cx(s.Paragraph, props.className);

  return <p {...props} className={ParagraphClassName}>{props.children}</p>;
};

Paragraph.propTypes = propTypes;

export default Paragraph;
