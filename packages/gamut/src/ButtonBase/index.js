import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import styles from './styles.scss';
const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  link: PropTypes.bool,
  onClick: PropTypes.func,
};
const ButtonBase = props => {
  const { href, className, link, onClick } = props;
  const propsToTransfer = omitProps(propTypes, props);
  const BaseTag = href ? 'a' : 'button';
  const classes = cx(styles.basicBtn, className, {
    [styles.basicLink]: link,
  });
  return React.createElement(
    BaseTag,
    Object.assign({ 'data-btn': true }, propsToTransfer, {
      className: classes,
      href: href,
      onClick: onClick,
    })
  );
};
ButtonBase.propTypes = propTypes;
export default ButtonBase;
//# sourceMappingURL=index.js.map
