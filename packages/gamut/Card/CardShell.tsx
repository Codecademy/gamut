import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardShell.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  hoverShadow: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  hoverShadow: false,
};

export default function CardShell({ children, hoverShadow, className }) {
  const shellClasses = cx(
    s.shell,
    {
      [s.hoverShadow]: hoverShadow,
    },
    className
  );

  return <div className={shellClasses}>{children}</div>;
}

CardShell.propTypes = propTypes;
CardShell.defaultProps = defaultProps;
