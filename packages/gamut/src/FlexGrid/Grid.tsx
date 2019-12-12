import React, { ReactNode } from 'react';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import style from './styles/index.module.scss';

const propKeys = ['fluid', 'className', 'tagName', 'children'];

export type GridProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  fluid?: boolean;
  tagName?: string;
};

export const Grid: React.FC<GridProps> = props => {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(
    props.tagName || 'div',
    omitProps(propKeys, { ...props, className })
  );
};

export default Grid;
