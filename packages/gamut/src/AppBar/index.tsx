import cx from 'classnames';
import React from 'react';

import { FlexBox } from '..';
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
      <ContentContainer size={wide ? 'wide' : 'medium'}>
        <FlexBox alignItems="center" height="100%">
          {children}
        </FlexBox>
      </ContentContainer>
    </div>
  );
};
