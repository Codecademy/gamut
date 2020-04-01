import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import {
  ContainerElementProps,
  ColumnSizes,
  ResponsiveProperty,
  OffsetColumnSizes,
  OptionalResponsiveProperty,
} from './types';
import s from './styles/Column.module.scss';

export type ColumnProps = {
  size: ResponsiveProperty<ColumnSizes>;
  offset?: OptionalResponsiveProperty<OffsetColumnSizes>;
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
