import React from 'react';
import cx from 'classnames';

import { ContainerElementProps } from './types';
import s from './styles/Column.scss';

type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ColumnProps = {
  sm: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
};

/**
 * This is a temporary component that is intended to be moved to Gamut Shortly
 */
const Column: React.FC<ColumnProps & ContainerElementProps> = ({
  children,
  md,
  sm,
  lg,
  testId,
}) => {
  const classNames = cx({
    [s[`column_lg__${lg}`]]: lg,
    [s[`column_md__${md}`]]: md,
    [s[`column_sm__${sm}`]]: sm,
  });
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
