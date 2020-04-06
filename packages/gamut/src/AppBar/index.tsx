import React from 'react';
import cx from 'classnames';
import ContentContainer from '../ContentContainer';

import AppBarSection from './AppBarSection';
import AppBarTab from './AppBarTab';
import styles from './styles/index.scss';

export type AppBarProps = {
  className?: string;
  wide?: boolean;
};

export class AppBar extends React.Component<AppBarProps> {
  render() {
    const { wide, children, className } = this.props;
    const classes = cx(styles.wrapper, className);

    return (
      <div className={classes}>
        <ContentContainer className={styles.contentWrapper} wide={wide}>
          {children}
        </ContentContainer>
      </div>
    );
  }
}

export default AppBar;

export { AppBarSection, AppBarTab };
