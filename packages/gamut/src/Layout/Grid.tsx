import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import { ContainerElementProps, MediaSizes, GapSizes, GapTypes } from './types';
import s from './styles/Grid.module.scss';

export type GapConfig = Record<MediaSizes, GapSizes>;
export type GridProps = Record<GapTypes, GapConfig | GapSizes>;
export type LayoutGridProps = GridProps & ContainerElementProps;

export const Grid: React.FC<LayoutGridProps> = ({
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

export default Grid;
