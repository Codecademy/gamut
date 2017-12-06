import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardBody';

const propTypes = {
  children: PropTypes.node.isRequired,
  standardPadding: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  flex: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  standardPadding: true,
  flex: true
};

export default function CardBody({ children, standardPadding, align, flex, className }) {
  const bodyClasses = cx({
    [s.standardPadding]: standardPadding,
    [s.flex]: flex,
    [s.leftAlign]: align === 'left',
    [s.centerAlign]: align === 'center',
    [s.rightAlign]: align === 'right',
  }, className);

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;
