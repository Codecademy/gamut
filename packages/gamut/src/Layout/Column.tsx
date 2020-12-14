import cx from 'classnames';
import React from 'react';

import {
  OptionalResponsiveProperty,
  ResponsiveProperty,
} from '../typings/responsive-properties';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import styles from './styles/Column.module.scss';
import { ColumnSizes, ContainerElementProps, OffsetColumnSizes } from './types';

export type ColumnProps = {
  /** The number of columns this element should span out of 12 */
  size: ResponsiveProperty<ColumnSizes>;
  /** The column that this element should start at */
  offset?: OptionalResponsiveProperty<OffsetColumnSizes>;
  /** The number of rows this element should span */
  rowspan?: OptionalResponsiveProperty<1 | 2 | 3>;
} & ContainerElementProps;

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  size,
  offset,
  rowspan,
  testId,
}) => {
  const classNames = cx(
    styles.container,
    className,
    generateResponsiveClassnames({ size, offset, rowspan }, styles)
  );
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};
