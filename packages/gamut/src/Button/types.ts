import { ColorModes } from '@codecademy/gamut-styles';
import { HTMLProps } from 'react';

export interface ButtonProps
  extends Omit<
    HTMLProps<HTMLAnchorElement> & HTMLProps<HTMLButtonElement>,
    'size' | 'ref' | 'height' | 'width' | 'size'
  > {
  as?: never;
  mode?: ColorModes;
  variant?: 'primary' | 'secondary';
}

export interface SizedButtonProps extends ButtonProps {
  size?: 'normal' | 'small';
}
