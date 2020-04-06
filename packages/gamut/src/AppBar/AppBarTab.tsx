import React from 'react';
import cx from 'classnames';
import styles from './styles/index.scss';

export type AppBarTabProps = {
  button?: boolean;
  className?: string;
};

class AppBarTab extends React.Component<AppBarTabProps> {
  getInitialProps = () => ({
    button: false,
  });

  render() {
    const classes = cx({
      [styles.tab]: true,
      [styles.tabButton]: this.props.button,
      [`${this.props.className}`]: !!this.props.className,
    });
    return <div className={classes}>{this.props.children}</div>;
  }
}

export default AppBarTab;
