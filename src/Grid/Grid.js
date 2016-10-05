import React, { PropTypes } from 'react';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import style from './styles';

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node
};

const propKeys = Object.keys(propTypes);

export default function Grid(props) {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(props.tagName || 'div', omitProps(propKeys, { ...props, className }));
}

Grid.propTypes = propTypes;
