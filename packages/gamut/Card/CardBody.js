import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardBody';

const propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool
};

export default function CardBody({ children, padding = true }) {
  const bodyClasses = cx({
    [s.padding]: padding
  });

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
