import { Theme } from '@emotion/react';
import { HTMLProps } from 'react';

export interface ButtonProps
  extends Omit<
    HTMLProps<HTMLAnchorElement> & HTMLProps<HTMLButtonElement>,
    'size' | 'ref' | 'height' | 'width' | 'size'
  > {
  as?: never;
  mode?: keyof Theme['colorModes']['modes'];
  variant?: 'primary' | 'secondary';
}

export interface SizedButtonProps extends ButtonProps {
  size?: 'normal' | 'small';
}
