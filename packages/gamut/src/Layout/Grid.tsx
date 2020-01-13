import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import { ContainerElementProps, MediaSizes, GapSizes, GapTypes } from './types';
import s from './styles/Grid.scss';

type GapConfig = Record<MediaSizes, GapSizes>;

type GridProps = Record<GapTypes, GapConfig | GapSizes>;

type LayoutGridProps = GridProps & ContainerElementProps;

const Grid: React.FC<LayoutGridProps> = ({
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
