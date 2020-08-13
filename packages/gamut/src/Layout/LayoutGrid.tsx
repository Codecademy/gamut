import React from 'react';
import cx from 'classnames';

import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import { ContainerElementProps, GapSizes } from './types';
import { ResponsiveProperty } from '../typings/responsive-properties';

import s from './styles/Grid.module.scss';

export type LayoutGridProps = {
  /** The grid-gap size that should be present between rows */
  rowGap?: ResponsiveProperty<GapSizes>;
  /** The grid-gap size that should be present between columns */
  columnGap?: ResponsiveProperty<GapSizes>;
} & ContainerElementProps;

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
    generateResponsiveClassnames({ rowGap, columnGap }, s)
  );

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};
