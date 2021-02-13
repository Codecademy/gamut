import cx from 'classnames';
import React from 'react';

import { ContentContainer } from '../ContentContainer';
import styles from './styles/index.module.scss';

export type AppBarProps = {
  className?: string;
  /**
   * Whether the container should be larger than the default content size.
   */
  wide?: boolean;
};

export const AppBar: React.FC<AppBarProps> = ({
  wide,
  children,
  className,
}) => {
  const classes = cx(styles.wrapper, className);

  return (
    <div className={classes}>
      <ContentContainer className={styles.contentWrapper} wide={wide}>
        {children}
      </ContentContainer>
    </div>
  );
};
