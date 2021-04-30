import { Theme } from '@emotion/react';
import { HTMLProps } from 'react';

export type ButtonProps = Omit<
  HTMLProps<HTMLAnchorElement> & HTMLProps<HTMLButtonElement>,
  'size' | 'ref'
> & {
  mode?: keyof Theme['colorModes']['modes'];
  variant?: 'primary' | 'secondary';
};

export type ButtonSizeProps = {
  size?: 'normal' | 'small';
};
export type SizedButtonProps = ButtonProps & ButtonSizeProps;
