import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

class TextBlock extends PureComponent {
  static propTypes = {
    spacing: PropTypes.oneOf(['loose', 'tight', 'none']),
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { spacing = 'tight', children, className } = this.props;

    const spacingStyles = s[`spacing-${spacing}`];
    const classes = cx(spacingStyles, className);

    return <div className={classes}>{children}</div>;
  }
}

export default TextBlock;
