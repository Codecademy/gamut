import cx from 'classnames';
import React from 'react';

import styles from './styles.scss';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

export enum TextLinkType {
  /**
   * @remarks
   * Use this only for links that have another indication other than color of being links.
   * Our link color does not provide enough color contrast to be distinguished from plain text.
   * @see https://www.w3.org/TR/WCAG20-TECHS/G183.html
   */
  ColorTransition,

  Standard,

  /**
   * @remarks
   * Use this only for links that have another indication other than color of being links.
   * Our link color does not provide enough color contrast to be distinguished from plain text.
   * @see https://www.w3.org/TR/WCAG20-TECHS/G183.html
   */
  UnderlineTransition,
}

const linkClassNames = {
  [TextLinkType.ColorTransition]: styles.colorTransition,
  [TextLinkType.Standard]: styles.standard,
  [TextLinkType.UnderlineTransition]: styles.underlineTransition,
};

export type TextLinkProps = {
  buttonProps?: ButtonBaseProps;
  type?: TextLinkType;
};

const TextLink: React.FC<TextLinkProps> = ({
  buttonProps = {},
  children,
  type = TextLinkType.Standard,
}) => {
  const className = cx(
    buttonProps.className,
    styles.textLink,
    linkClassNames[type]
  );

  return (
    <ButtonBase {...buttonProps} className={className}>
      {children}
    </ButtonBase>
  );
};

export default TextLink;
