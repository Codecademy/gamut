import React from 'react';
import cx from 'classnames';

import { Button, ButtonProps } from '../../Button';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';
import styles from './styles.module.scss';

export type GridFormSubmitPosition = 'left' | 'center' | 'right' | 'stretch';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled?: ButtonProps['disabled'];
  position?: GridFormSubmitPosition;
  outline?: ButtonProps['outline'];
  size?: ResponsiveProperty<ColumnSizes>;
  theme?: ButtonProps['theme'];
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  position = 'left',
  size,
  theme = 'brand-purple',
}) => {
  const positionStyle = styles[position];

  return (
    <Column className={cx(styles.base, positionStyle)} size={size}>
      <Button disabled={disabled} theme={theme} type="submit">
        {contents}
      </Button>
    </Column>
  );
};

export default GridFormSubmit;
