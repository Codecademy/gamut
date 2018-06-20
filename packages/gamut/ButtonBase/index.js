import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import styles from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  link: PropTypes.bool,
  className: PropTypes.string,
};

const ButtonBase = props => {
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
