import { ContentContainer, WithChildrenProp } from '@codecademy/gamut';
import cx from 'classnames';
import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';

export interface AppBarProps extends WithChildrenProp {
  className?: string;
  /**
   * Whether the container should be larger than the default content size.
   */
  wide?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  wide,
  children,
  className,
}) => {
  const classes = cx(styles.wrapper, className);

  return (
    <ContentContainer
      className={classes}
      display="flex"
      alignItems="center"
      height="100%"
      size={wide ? 'wide' : 'medium'}
    >
      {children}
    </ContentContainer>
  );
};
