import React from 'react';
import cx from 'classnames';
import styles from './styles/index.scss';

export type AppBarSectionProps = {
  position?: 'left' | 'center' | 'right';
  className?: string;
};

class AppBarSection extends React.Component<AppBarSectionProps> {
  render() {
    const classes = cx({
      [styles.section]: true,
      [styles.sectionRight]: this.props.position === 'right',
      [styles.sectionLeft]: this.props.position === 'left',
      [styles.sectionCenter]: this.props.position === 'center',
      [`${this.props.className}`]: !!this.props.className,
    });
    return <div className={classes}>{this.props.children}</div>;
  }
}

export default AppBarSection;
