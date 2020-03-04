import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import { ContainerElementProps, ColumnSizes, MediaSizes } from './types';
import s from './styles/Column.module.scss';

export type ColumnSizeConfig = Record<MediaSizes, ColumnSizes>;

export type ColumnProps = {
  size: ColumnSizeConfig | ColumnSizes;
  offset: ColumnSizeConfig | ColumnSizes;
} & ContainerElementProps;

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  size,
  offset,
  testId,
}) => {
  const classNames = cx(
    s.container,
    className,
    createClassnames({ size, offset }, s)
  );
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
