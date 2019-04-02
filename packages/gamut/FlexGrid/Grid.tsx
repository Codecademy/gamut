import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import style from './styles/index.scss';

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

const propKeys = Object.keys(propTypes);

export type GridProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  fluid?: boolean;
  tagName?: string;
};

const Grid = (props: GridProps) => {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(
    props.tagName || 'div',
    omitProps(propKeys, { ...props, className })
  );
};

Grid.propTypes = propTypes;

export default Grid;
