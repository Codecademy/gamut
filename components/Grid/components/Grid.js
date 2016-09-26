import React, { PropTypes } from 'react';
import cx from 'classnames';
import createProps from '../createProps';
import style from '../styles';

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node
};

export default function Grid(props) {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(props.tagName || 'div', createProps(propTypes, props, className));
}

Grid.propTypes = propTypes;
