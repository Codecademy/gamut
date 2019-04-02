import React, { ReactNode } from 'react';
import cx from 'classnames';
import s from './styles/CardBody.scss';

const defaultProps = {
  standardPadding: true,
};

export type CardBodyProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  standardPadding?: boolean;
};

const CardBody = ({
  children,
  standardPadding,
  className,
}: CardBodyProps) => {
  const bodyClasses = cx(
    {
      [s.standardPadding]: standardPadding,
    },
    className
  );

  return <div className={bodyClasses}>{children}</div>;
}

CardBody.defaultProps = defaultProps;

export default CardBody;
