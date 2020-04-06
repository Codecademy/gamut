import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import {
  ContainerElementProps,
  GapSizes,
  GapTypes,
  ResponsiveProperty,
} from './types';
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
    createClassnames({ rowGap, columnGap }, s)
  );

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};

export default LayoutGrid;
