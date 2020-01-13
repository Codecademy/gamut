import React from 'react';
import cx from 'classnames';

import { createClassnames } from './utilities';
import { ContainerElementProps, ColumnSizes, MediaSizes } from './types';
import s from './styles/Column.scss';

type ColumnSizeConfig = Record<MediaSizes, ColumnSizes>;

type ColumnProps = {
  size: ColumnSizeConfig | ColumnSizes;
  fill?: boolean;
};

const Column: React.FC<ColumnProps & ContainerElementProps> = ({
  children,
  size,
  testId,
  fill = true,
}) => {
  const classNames = cx(createClassnames({ size }, s), {
    [s.container]: fill,
  });
  return (
    <div className={classNames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Column;
