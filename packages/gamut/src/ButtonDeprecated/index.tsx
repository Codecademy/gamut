/* eslint-disable react/destructuring-assignment */
import cx from 'classnames';
import { hasIn } from 'lodash';
import { ReactNode } from 'react';
import * as React from 'react';

import {
  ButtonDeprecatedBase,
  ButtonDeprecatedBaseProps,
} from '../ButtonDeprecatedBase';
import { omitProps } from '../utils/omitProps';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';

// themes can be an alias to a color
// or a unique button type
export const buttonPresetThemes = {
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint',
  royalblue: 'brand-purple',
} as const;

const themes = [
  'hyper',
  'navy',
  'red',
  'white',
  'brand-red',
  'brand-yellow',
  'brand-purple',
  'brand-dark-blue',
  'brand-blue',
  'mint',
  'darkmint',
  'grey',
  'greyblue',
] as const;

export type ButtonDeprecatedThemes =
  | keyof typeof buttonPresetThemes
  | typeof themes[number];

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

export type ButtonDeprecatedProps = ButtonDeprecatedBaseProps & {
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
  theme?: ButtonDeprecatedThemes;
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

const isPreset = (theme: string): theme is keyof typeof buttonPresetThemes => {
  return hasIn(buttonPresetThemes, theme);
};

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [FillButon](https://gamut.codecademy.com/storybook/?path=/docs/atoms-button--fill-button#fill-button)
 *
 * @example
 * import { FillButton } fom '@codecademy/gamut';
 *
 * <FillButton variant="primary" />
 */

export const ButtonDeprecated: React.FC<ButtonDeprecatedProps> = (props) => {
  let { theme = 'brand-red' } = props;

  if (isPreset(theme)) {
    theme = buttonPresetThemes[theme];
  }

  const typeClassName = props.link ? styles.link : styles.btn;
  const themeClassName = props.link
    ? styles[`link-${theme}`]
    : styles[`btn-${theme}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    styles[props.size!],
    {
      [styles.block]: props.block,
      [styles.go]: props.go,
      [styles.outline]: props.outline,
      [styles.underline]: props.underline,
      [styles.caps]: props.caps,
      [styles.round]: props.round,
      [styles.square]: props.square,
      [styles.flat]: props.flat,
      [styles['fit-text']]: props.fitText,
    },
    props.className
  );

  const propsToTransfer = omitProps(propKeys, props);

  return (
    <ButtonDeprecatedBase
      {...propsToTransfer}
      className={classes}
      link={props.link}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonDeprecatedBase>
  );
};
