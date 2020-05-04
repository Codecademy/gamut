import React, { ReactNode } from 'react';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import style from './styles/index.module.scss';

const propKeys = ['fluid', 'className', 'tagName', 'children'];

export type FlexGridProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  fluid?: boolean;
  tagName?: string;
};

export const FlexGrid: React.FC<FlexGridProps> = (props) => {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(
    props.tagName || 'div',
    omitProps(propKeys, { ...props, className })
  );
};

export default FlexGrid;
