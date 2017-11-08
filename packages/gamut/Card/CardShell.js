import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardShell';

const propTypes = {
  children: PropTypes.node.isRequired,
  hoverShadow: PropTypes.bool,
  standardWidth: PropTypes.bool
};

const defaultProps = {
  hoverShadow: true,
  standardWidth: true
};

export default function CardShell({ children, hoverShadow, standardWidth }) {
  const shellClasses = cx(s.shell, {
    [s.hoverShadow]: hoverShadow,
    [s.standardWidth]: standardWidth
  });

  return (
    <div className={shellClasses}>
      {children}
    </div>
  );
}

CardShell.propTypes = propTypes;
CardShell.defaultProps = defaultProps;
