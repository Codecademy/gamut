import React, { HTMLProps, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import styles from './styles.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  link: PropTypes.bool,
  onClick: PropTypes.func,
};

export type ButtonBaseProps = (
  | HTMLProps<HTMLLinkElement>
  | HTMLProps<HTMLButtonElement>) & {
  /**
   * Component type to wrap children with.
   */
  as?: React.ComponentType;
  /**
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  asProps?: any;
  children?: ReactNode;
  className?: string;
  href?: string;
  link?: boolean;
  onClick?: (event: object) => void;
};

const ButtonBase = (props: ButtonBaseProps) => {
  const { href, className, link, onClick } = props;
  const { as: As, asProps = {}, ...restOfProps } = props;
  const propsToTransfer = omitProps(propTypes, restOfProps);

  const classes = cx(styles.basicBtn, className, {
    [styles.basicLink]: link,
  });

  const defaultProps = {
    ...propsToTransfer,
    className: classes,
    onClick: onClick,
  };

  if (As) {
    return <As data-btn {...defaultProps} {...asProps} />;
  }

  if (href) {
    return <a data-btn {...defaultProps} href={href} />;
  }

  return <button data-btn {...defaultProps} />;
};

ButtonBase.propTypes = propTypes;

export default ButtonBase;
