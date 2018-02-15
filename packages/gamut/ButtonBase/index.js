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

  const classes = cx(
    {
      [styles.basicLink]: !!link,
      [styles.basicBtn]: !link,
    },
    className
  );

  const BaseTag = href ? 'a' : 'button';

  return (
    <BaseTag data-btn {...propsToTransfer} className={classes} href={href}>
      {children}
    </BaseTag>
  );
};

ButtonBase.propTypes = propTypes;

export default ButtonBase;
