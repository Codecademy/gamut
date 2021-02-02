import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type ContentContainerProps = {
  className?: string;
  /**
   * Component type to wrap children with.
   */
  as?: React.ElementType;
  /**
   * Toggle a containerWide className to be applied with no max-width and smaller padding
   */
  wide?: boolean;
};

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  as: Element = 'div',
  wide = false,
}) => {
  const classes = cx(
    {
      [styles.contentContainerWide]: wide,
    },
    styles.contentContainer,
    className
  );

  return <Element className={classes}>{children}</Element>;
};
