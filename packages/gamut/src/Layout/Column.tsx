import React from 'react';
import cx from 'classnames';

import { ContainerElementProps, ColumnSizes } from './types';
import s from './styles/Column.scss';

type ColumnProps = {
  sm: ColumnSizes;
  md?: ColumnSizes;
  lg?: ColumnSizes;
  fill?: boolean;
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
  fill = true,
}) => {
  const classNames = cx({
    [s.container]: fill,
    [s[`column_lgScreen__${lg}`]]: lg,
    [s[`column_mdScreen__${md}`]]: md,
    [s[`column_smScreen__${sm}`]]: sm,
  });
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
