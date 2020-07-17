import React, { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import styles from './styles.module.scss';

const propKeys = ['children', 'className', 'href', 'link', 'onClick'];

export type ButtonBaseProps = Omit<
  HTMLProps<HTMLLinkElement> & HTMLProps<HTMLButtonElement>,
  'size'
> & {
  /**
   * Component type to wrap children with.
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  as?: any;
  /**
   */
  asProps?: any;
  children?: ReactNode;
  className?: string;
  href?: string;
  /**
   * Variant that displays the button as an inline link element, but maintains its semantic meaning as a button.
   */
  link?: boolean;
  /**
   * @remarks
   * Technically, this is only ever a button event *or* a link event.
   * We '&' them together for ease of usage.
   */
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement> &
      React.MouseEvent<HTMLButtonElement>
  ) => void;
};

export const ButtonBase: React.FC<ButtonBaseProps> = (props) => {
  const { href, className, link, onClick } = props;
  const { as: As, asProps = {}, ...restOfProps } = props;
  const propsToTransfer = omitProps(propKeys, restOfProps);

  const classes = cx(styles.basicBtn, className, {
    [styles.basicLink]: link,
  });

  const defaultProps = {
    ...propsToTransfer,
    className: classes,
    onClick: onClick,
    'data-btn': true,
  };

  if (As) {
    return <As {...defaultProps} {...asProps} />;
  }

  if (href) {
    // Anchor tag receives children content from propsToTransfer
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...defaultProps} href={href} />;
  }

  // eslint-disable-next-line react/button-has-type
  return <button {...defaultProps} />;
};

export default ButtonBase;
