import React, { HTMLProps, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  link: PropTypes.bool,
};

export type ButtonBaseProps = (HTMLProps<HTMLLinkElement> | HTMLProps<HTMLButtonElement>) & {
  children?: ReactNode
  className?: string;
  href?: string;
  link?: boolean;
}

const ButtonBase = (props: ButtonBaseProps) => {
  const { children, href, className, link } = props;
  const propsToTransfer = omitProps(propTypes, props);

  const BaseTag = href ? 'a' : 'button';
  const classes = cx(styles.basicBtn, className, {
    [styles.basicLink]: link,
  });

  return (
    <BaseTag data-btn {...propsToTransfer} className={classes} href={href}>
      {children}
    </BaseTag>
  );
};

ButtonBase.propTypes = propTypes;

export default ButtonBase;
