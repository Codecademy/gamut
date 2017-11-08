import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardBody';

const propTypes = {
  children: PropTypes.node.isRequired,
  standardPadding: PropTypes.bool
};

const defaultProps = {
  standardPadding: true
};

export default function CardBody({ children, standardPadding }) {
  const bodyClasses = cx({
    [s.standardPadding]: standardPadding
  });

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;
