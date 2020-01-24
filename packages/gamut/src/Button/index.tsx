import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';
import omitProps from '../utils/omitProps';
import s from './styles/index.module.scss';
import { ChildComponentDescriptor } from '../typings/react';

// themes can be an alias to a color
// or a unique button type
export const presetThemes: { [i: string]: string } = {
  primary: 'red',
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint',
};

const propKeys = [
  'theme',
  'size',
  'outline',
  'underline',
  'link',
  'caps',
  'go',
  'children',
  'block',
  'className',
  'round',
  'square',
  'flat',
  'fitText',
  'onClick',
];

export type ButtonProps = ButtonBaseProps & {
  block?: boolean;
  caps?: boolean;
  fitText?: boolean;
  flat?: boolean;
  go?: boolean;
  link?: boolean;
  outline?: boolean;
  round?: boolean;
  size?: 'small' | 'large';
  square?: boolean;
  theme?: string;
  underline?: boolean;
};

export const Button: React.FC<ButtonProps> = props => {
  let { theme = 'primary' } = props;

  if (theme && presetThemes[theme]) {
    theme = presetThemes[theme];
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    s[props.size],
    {
      [s.block]: props.block,
      [s.go]: props.go,
      [s.outline]: props.outline,
      [s.underline]: props.underline,
      [s.caps]: props.caps,
      [s.round]: props.round,
      [s.square]: props.square,
      [s.flat]: props.flat,
      [s['fit-text']]: props.fitText,
    },
    props.className
  );

  const propsToTransfer = omitProps(propKeys, props);

  return (
    <ButtonBase
      {...propsToTransfer}
      className={classes}
      link={props.link}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonBase>
  );
};

export default Button;
