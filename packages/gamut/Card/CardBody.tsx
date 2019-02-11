import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/CardBody.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  standardPadding: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  standardPadding: true,
};

export type CardBodyProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  standardPadding?: boolean;
}

export default function CardBody({ children, standardPadding, className }: CardBodyProps) {
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
