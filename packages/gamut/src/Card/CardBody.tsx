import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles/CardBody.module.scss';

const defaultProps = {
  standardPadding: true,
};

export type CardBodyProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  /**
   * Use standard height regardless of content.
   */
  standardPadding?: boolean;
};

export const CardBody = ({
  children,
  standardPadding,
  className,
}: CardBodyProps) => {
  const bodyClasses = cx(
    {
      [styles.standardPadding]: standardPadding,
    },
    className
  );

  return <div className={bodyClasses}>{children}</div>;
};

CardBody.defaultProps = defaultProps;
