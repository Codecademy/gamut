import React, { ReactNode } from 'react';
import cx from 'classnames';
import { omitProps } from '../utils/omitProps';
import style from './styles/index.module.scss';

const propKeys = ['fluid', 'className', 'as', 'children'];

export type FlexGridProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  /** Whether the container should be relative to its parents dimensions */
  fluid?: boolean;
  /**
   * Component type to wrap children with.
   */
  as?: string;
};

export const FlexGrid: React.FC<FlexGridProps> = (props) => {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return React.createElement(
    props.as || 'div',
    omitProps(propKeys, { ...props, className })
  );
};
