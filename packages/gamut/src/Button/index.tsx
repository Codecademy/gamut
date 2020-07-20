import React, { ReactNode } from 'react';
import cx from 'classnames';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';
import omitProps from '../utils/omitProps';
import s from './styles/index.module.scss';

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

export type ButtonProps = ButtonBaseProps & {
  /**
   * Whether button should behave like a block element or inline.
   */
  block?: boolean;
  /**
   * Capitalize the text of the button.
   */
  caps?: boolean;
  children: ReactNode;
  /**
   * Disables the button and adds visual indicators to show it is not interactive.
   */
  disabled?: boolean;
  /**
   * Variant that displays the button as flat.
   */
  flat?: boolean;
  /**
   * Adds a pulsing animation to the button
   */
  go?: boolean;
  /**
   * Changes the button to a link with no visual indication
   */
  href?: string;
  /**
   * Link relationship property to be used with `href`
   */
  rel?: string;
  /**
   * Link target property to be used with `href`
   */
  target?: string;
  id?: string;
  /**
   * Variant that displays the button as an inline link element, but maintains its semantic meaning as a button.
   */
  link?: boolean;
  /**
   * Variant the displays the button as a button that is outlined instead of solid.
   */
  outline?: boolean;
  /**
   *  Variant that rounds the corners of the button
   */
  round?: boolean;
  /**
   * Variant that determines the size of the button
   */
  size?: 'small' | 'large';
  /**
   * Variant that displays the button as a square
   */
  square?: boolean;
  /**
   * Variant that controls the background and text color of the button
   * */
  theme?: string;
  type?: string;
  /**
   * Variant that underlines the text of the button.
   */
  underline?: boolean;
  /**
   *  Determines whether button dimensions should be determined by the content
   */
  fitText?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
  let { theme = 'brand-red' } = props;

  if (theme && buttonPresetThemes[theme]) {
    theme = buttonPresetThemes[theme];
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    s[props.size!],
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
