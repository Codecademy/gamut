import React from 'react';
import cx from 'classnames';

import {
  ButtonDeprecated,
  ButtonDeprecatedProps,
} from '../../ButtonDeprecated';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';
import styles from './styles.module.scss';

export type GridFormSubmitPosition = 'left' | 'center' | 'right' | 'stretch';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled?: ButtonDeprecatedProps['disabled'];
  position?: GridFormSubmitPosition;
  outline?: ButtonDeprecatedProps['outline'];
  size: ResponsiveProperty<ColumnSizes>;
  theme?: ButtonDeprecatedProps['theme'];
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  outline,
  position = 'left',
  size,
  theme = 'brand-purple',
}) => {
  const positionStyle = styles[position];

  return (
    <Column className={cx(styles.base, positionStyle)} size={size}>
      <ButtonDeprecated
        disabled={disabled}
        outline={outline}
        theme={theme}
        type="submit"
      >
        {contents}
      </ButtonDeprecated>
    </Column>
  );
};
