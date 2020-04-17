import React from 'react';
import cx from 'classnames';

import { Button } from '../../Button';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';
import styles from './styles.module.scss';

export type GridFormSubmitPosition = 'left' | 'center' | 'right';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  position?: GridFormSubmitPosition;
  size?: ResponsiveProperty<ColumnSizes>;
  theme?: string;
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  position = 'left',
  size,
  theme = 'brand-purple',
}) => {
  const positionStyle = styles[position];

  return (
    <Column className={cx(styles.base, positionStyle)} size={size}>
      <Button theme={theme} type="submit">
        {contents}
      </Button>
    </Column>
  );
};

export default GridFormSubmit;
