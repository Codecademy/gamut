import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Header.scss';

const propTypes = {
  size: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string
};

const Header = (props) => {
  const { size = 1 } = props;
  const HeadingTag = `h${size}`;

  const classes = cx({
    [s[`Header${size}`]]: Boolean(s[`Header${size}`])
  }, props.className);

  return <HeadingTag {...props} className={classes} />;
};

Header.propTypes = propTypes;

export default Header;
