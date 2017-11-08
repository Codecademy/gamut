import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardShell';

const propTypes = {
  children: PropTypes.node.isRequired,
  hoverShadow: PropTypes.bool
};

export default function CardShell({ children, hoverShadow = true }) {
  const shellClasses = cx(s.shell, {
    [s.hoverShadow]: hoverShadow
  });

  return (
    <div className={shellClasses}>
      {children}
    </div>
  );
}

CardShell.propTypes = propTypes;
