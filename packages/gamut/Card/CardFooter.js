import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
  border: PropTypes.oneOf(['dashed', 'solid', 'none']),
  align: PropTypes.oneOf(['center', 'left', 'right']),
  flex: PropTypes.bool
};

const defaultProps = {
  border: 'none',
  align: 'left',
  flex: true
};

export default function CardFooter({ children, border, align, flex }) {
  const footerClasses = cx(s.footer, {
    [s.flex]: flex,
    [s.solidTopBorder]: border === 'solid',
    [s.dashedTopBorder]: border === 'dashed',
    [s.transparentTopBorder]: border === 'none',
    [s.leftAlign]: align === 'left',
    [s.centerAlign]: align === 'center',
    [s.rightAlign]: align === 'right'
  });

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
}

CardFooter.propTypes = propTypes;
CardFooter.defaultProps = defaultProps;
