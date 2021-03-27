import cx from 'classnames';
import React, { ReactNode } from 'react';

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
  as?: React.ElementType;
};

/**
 * @deprecated
 */

export const FlexGrid: React.FC<FlexGridProps> = ({
  as: Element = 'div',
  ...props
}) => {
  const containerClass = style[props.fluid ? 'container-fluid' : 'container'];
  const className = cx(props.className, containerClass);

  return <Element {...omitProps(propKeys, { ...props, className })} />;
};
