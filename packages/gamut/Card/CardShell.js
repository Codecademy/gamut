import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardShell';

const propTypes = {
  children: PropTypes.node.isRequired,
  hoverShadow: PropTypes.bool,
  standardWidth: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  hoverShadow: false,
  standardWidth: true
};

export default function CardShell({
  children,
  hoverShadow,
  standardWidth,
  className
}) {
  const shellClasses = cx(
    s.shell,
    {
      [s.hoverShadow]: hoverShadow,
      [s.standardWidth]: standardWidth
    },
    className
  );

  return <div className={shellClasses}>{children}</div>;
}

CardShell.propTypes = propTypes;
CardShell.defaultProps = defaultProps;
