import React from 'react';
import cx from 'classnames';

import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import { ContainerElementProps, ColumnSizes, OffsetColumnSizes } from './types';
import styles from './styles/Column.module.scss';
import {
  ResponsiveProperty,
  OptionalResponsiveProperty,
} from '../typings/responsive-properties';

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
