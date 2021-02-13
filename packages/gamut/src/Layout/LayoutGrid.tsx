import cx from 'classnames';
import React from 'react';

import { ResponsiveProperty } from '../typings/responsive-properties';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import styles from './styles/Grid.module.scss';
import { ContainerElementProps, GapSizes } from './types';

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
    styles.container,
    className,
    generateResponsiveClassnames({ rowGap, columnGap }, styles)
  );

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};
