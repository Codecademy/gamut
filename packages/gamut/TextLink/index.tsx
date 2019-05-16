import styles from './styles.scss';

export const linkClassNames = {
  /**
   * @remarks
   * Use this only for links that have another indication other than color of being links.
   * Our link color does not provide enough color contrast to be distinguished from plain text.
   * @see https://www.w3.org/TR/WCAG20-TECHS/G183.html
   */
  colorTransition: styles.colorTransition,

  standard: styles.standard,

  /**
   * @remarks
   * Use this only for links that have another indication other than color of being links.
   * Our link color does not provide enough color contrast to be distinguished from plain text.
   * @see https://www.w3.org/TR/WCAG20-TECHS/G183.html
   */
  underlineTransition: styles.underlineTransition,
};
