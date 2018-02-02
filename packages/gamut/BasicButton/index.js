import React from 'react';
import PropTypes from 'prop-types';
import omitProps from '../utils/omitProps';
import styles from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  link: PropTypes.bool,
  className: PropTypes.string,
};

const BasicButton = props => {
  const { children, href, className, link } = props;
  const propsToTransfer = omitProps(propTypes, props);

  const baseStyle = link ? styles.basicLink : styles.basicBtn;

  if (href) {
    return (
      <a
        data-btn
        {...propsToTransfer}
        href={href}
        className={`${baseStyle} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      data-btn
      {...propsToTransfer}
      className={`${baseStyle} ${className}`}
    >
      {children}
    </button>
  );
};

BasicButton.propTypes = propTypes;

export default BasicButton;
