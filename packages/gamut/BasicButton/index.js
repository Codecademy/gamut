import React from 'react';
import PropTypes from 'prop-types';
import omitProps from '../utils/omitProps';
import styles from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

const BasicButton = props => {
  const { children, href, className } = props;
  const propsToTransfer = omitProps(propTypes, props);

  if (props.href) {
    return (
      <a
        data-btn
        {...propsToTransfer}
        href={href}
        className={`${styles.basicLink} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      data-btn
      {...propsToTransfer}
      className={`${styles.basicBtn} ${className}`}
    >
      {children}
    </button>
  );
};

BasicButton.propTypes = propTypes;

export default BasicButton;
