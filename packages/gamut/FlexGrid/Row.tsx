import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omitProps from '../utils/omitProps';
import style from './styles/index.scss';

const ModificatorType = PropTypes.oneOf(['xs', 'sm', 'md', 'lg']);
const modificatorKeys = [
  'start',
  'center',
  'end',
  'top',
  'middle',
  'bottom',
  'around',
  'between',
  'first',
  'last',
];

const propTypes = {
  reverse: PropTypes.bool,
  start: ModificatorType,
  center: ModificatorType,
  end: ModificatorType,
  top: ModificatorType,
  middle: ModificatorType,
  bottom: ModificatorType,
  around: ModificatorType,
  between: ModificatorType,
  first: ModificatorType,
  last: ModificatorType,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

const propKeys = Object.keys(propTypes);

function getClassNames(props) {
  const modificators = [style.row];

  for (const key of modificatorKeys) {
    const value = props[key];
    if (value) {
      modificators.push(style[`${key}-${value}`]);
    }
  }

  if (props.reverse) {
    modificators.push(style.reverse);
  }

  return cx(props.className, modificators);
}

export default function Row(props) {
  return React.createElement(
    props.tagName || 'div',
    omitProps(propKeys, { ...props, className: getClassNames(props) })
  );
}

Row.propTypes = propTypes;
