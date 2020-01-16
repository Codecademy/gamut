import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import { ContainerElementProps, ColumnSizes, MediaSizes } from './types';
import s from './styles/Column.scss';

export type ColumnSizeConfig = Record<MediaSizes, ColumnSizes>;

export type ColumnProps = {
  size: ColumnSizeConfig | ColumnSizes;
} & ContainerElementProps;

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  size,
  testId,
}) => {
  const classNames = cx(s.container, className, createClassnames({ size }, s));
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
