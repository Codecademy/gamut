import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardBody';

const propTypes = {
  children: PropTypes.node.isRequired,
  standardPadding: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  standardPadding: true,
};

export default function CardBody({ children, standardPadding, className }) {
  const bodyClasses = cx(
    {
      [s.standardPadding]: standardPadding,
    },
    className
  );

  return <div className={bodyClasses}>{children}</div>;
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;
