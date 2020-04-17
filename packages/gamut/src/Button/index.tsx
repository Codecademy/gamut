import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import ButtonBase from '../ButtonBase';
import omitProps from '../utils/omitProps';
import s from './styles/index.module.scss';
import { ChildComponentDescriptor } from '../typings/react';

// themes can be an alias to a color
// or a unique button type
export const buttonPresetThemes: { [i: string]: string } = {
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

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * Component type to wrap children with.
   */
  as?: ChildComponentDescriptor;
  /**
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  asProps?: any;
  block?: boolean;
  caps?: boolean;
  children: ReactNode;
  disabled?: boolean;
  fitText?: boolean;
  flat?: boolean;
  go?: boolean;
  href?: string;
  id?: string;
  link?: boolean;
  outline?: boolean;
  rel?: string;
  round?: boolean;
  size?: 'small' | 'large';
  square?: boolean;
  target?: string;
  theme?: string;
  type?: string;
  underline?: boolean;
};

export const Button: React.FC<ButtonProps> = props => {
  let { theme = 'brand-red' } = props;

  if (theme && buttonPresetThemes[theme]) {
    theme = buttonPresetThemes[theme];
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
      resetStyles={false}
      className={classes}
      link={props.link}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonBase>
  );
};

export default Button;
