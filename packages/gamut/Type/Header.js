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
  const { size } = props;
  const Header1 = cx(s.Header1, props.className);
  const Header2 = cx(s.Header2, props.className);
  const Header3 = cx(s.Header3, props.className);
  const Header4 = cx(s.Header4, props.className);
  const Header5 = cx(s.Header5, props.className);
  const Header6 = cx(s.Header6, props.className);

  switch (size) {
  case 2:
    return <h2 {...props} className={Header2}>{props.children}</h2>;
  case 3:
    return <h3 {...props} className={Header3}>{props.children}</h3>;
  case 4:
    return <h4 {...props} className={Header4}>{props.children}</h4>;
  case 5:
    return <h5 {...props} className={Header5}>{props.children}</h5>;
  case 6:
    return <h6 {...props} className={Header6}>{props.children}</h6>;
  default:
    return <h1 {...props} className={Header1}>{props.children}</h1>;
  }
};

Header.propTypes = propTypes;

export default Header;
