import React from 'react';
import cx from 'classnames';

import { ContainerElementProps, ColumnSizes, MediaSizes } from './types';
import s from './styles/Column.scss';

type ColumnSizeConfig = Record<MediaSizes, ColumnSizes>;

type ColumnProps = {
  size: ColumnSizeConfig | ColumnSizes;
  fill?: boolean;
};

const computeClasses = (size: ColumnSizeConfig) => {
  if (typeof size === 'string') {
    return { [s[`column_smScreen__${size}`]]: size };
  }

  return Object.keys(size).reduce((carry, mediaSize: MediaSizes) => {
    const columnSize = size[mediaSize];
    if (!columnSize) {
      return carry;
    }
    return {
      ...carry,
      [s[`column_${mediaSize}Screen__${columnSize}`]]: columnSize,
    };
  }, {});
};

const Column: React.FC<ColumnProps & ContainerElementProps> = ({
  children,
  size,
  testId,
  fill = true,
}) => {
  const sizeClasses = computeClasses(size);
  const classNames = cx({
    [s.container]: fill,
    ...sizeClasses,
  });
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
