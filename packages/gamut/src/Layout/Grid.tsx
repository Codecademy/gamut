import React from 'react';
import cx from 'classnames';

import { ContainerElementProps, GapSizes } from './types';
import s from './styles/Grid.scss';

type GridProps = {
  rowGap?: GapSizes;
  columnGap?: GapSizes;
};

const Grid: React.FC<GridProps & ContainerElementProps> = ({
  children,
  testId,
  className,
  columnGap,
  rowGap,
}) => {
  const classes = cx(s.gridContainer, className, {
    [s[`gridGap_row_${rowGap}`]]: rowGap,
    [s[`gridGap_column_${columnGap}`]]: columnGap,
  });

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};

export default Grid;
