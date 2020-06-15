import React from 'react';
import cx from 'classnames';

import { Button, ButtonAlignment } from '../../Button';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';
import styles from './styles.module.scss';

export type GridFormSubmitPosition = 'left' | 'center' | 'right' | 'stretch';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled: boolean;
  position?: GridFormSubmitPosition;
  size?: ResponsiveProperty<ColumnSizes>;
  theme?: string;
  alignment?: ButtonAlignment;
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  position = 'left',
  size,
  theme = 'brand-purple',
  alignment,
}) => {
  const positionStyle = styles[position];

  return (
    <Column className={cx(styles.base, positionStyle)} size={size}>
      <Button
        disabled={disabled}
        theme={theme}
        alignment={alignment}
        type="submit"
      >
        {contents}
      </Button>
    </Column>
  );
};

export default GridFormSubmit;
