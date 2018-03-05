import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ButtonBase from '../ButtonBase';
import omitProps from '../utils/omitProps';
import s from './styles';

// themes can be an alias to a color
// or a unique button type
export const presetThemes = {
  primary: 'red',
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint',
};

const propTypes = {
  theme: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
  outline: PropTypes.bool,
  underline: PropTypes.bool,
  link: PropTypes.bool,
  caps: PropTypes.bool,
  go: PropTypes.bool,
  children: PropTypes.node,
  block: PropTypes.bool,
  className: PropTypes.string,
  curved: PropTypes.bool,
  flat: PropTypes.bool,
  fitText: PropTypes.bool,
};

const Button = props => {
  let { theme = 'primary' } = props;
  const { curved = true } = props;

  if (theme && presetThemes[theme]) {
    theme = presetThemes[theme];
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    s[props.size],
    {
      [s.block]: props.block,
      [s.go]: props.go,
      [s.outline]: props.outline,
      [s.underline]: props.underline,
      [s.caps]: props.caps,
      [s.curved]: curved,
      [s.flat]: props.flat,
      [s.fittext]: props.fitText,
    },
    props.className
  );

  const propsToTransfer = omitProps(propTypes, props);

  return (
    <ButtonBase {...propsToTransfer} className={classes} link={props.link}>
      {props.children}
    </ButtonBase>
  );
};

Button.propTypes = propTypes;

export default Button;
