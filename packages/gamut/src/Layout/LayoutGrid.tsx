import React from 'react';
import cx from 'classnames';

import { generateClassnames } from '../utils/generateClassnames';
import { ContainerElementProps, GapSizes, GapTypes } from './types';
import { ResponsiveProperty } from '../typings/responsive-properties';

import s from './styles/Grid.module.scss';

export type GridProps = Record<GapTypes, ResponsiveProperty<GapSizes>>;
export type LayoutGridProps = GridProps & ContainerElementProps;

export const LayoutGrid: React.FC<Partial<LayoutGridProps>> = ({
  children,
  testId,
  className,
  rowGap,
  columnGap,
}) => {
  const classes = cx(
    s.container,
    className,
    generateClassnames({ rowGap, columnGap }, s)
  );

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};

export default LayoutGrid;
