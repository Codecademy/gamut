import cx from 'classnames';
import React, { ReactNode } from 'react';

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

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

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
