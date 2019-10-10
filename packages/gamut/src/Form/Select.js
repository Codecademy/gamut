import React from 'react';
import { isArray, isObject, each } from 'lodash';
import cx from 'classnames';
import s from './styles/Select.scss';
const Select = props => {
  const className = cx(s.Select, props.className);
  // Generate list of options
  const { options, ...propsToTransfer } = props;
  let selectOptions = [];
  if (isArray(options)) {
    selectOptions = options.map(option =>
      React.createElement('option', { key: option, value: option }, option)
    );
  } else if (isObject(options)) {
    each(options, (val, key) => {
      selectOptions.push(
        React.createElement('option', { key: key, value: key }, val)
      );
    });
  }
  return React.createElement(
    'div',
    { className: className },
    React.createElement(
      'svg',
      { className: s.selectIcon },
      React.createElement('path', {
        d: 'M1.175 0L5 3.825 8.825 0 10 1.183l-5 5-5-5z',
        fill: '#3E3E40',
      })
    ),
    React.createElement(
      'select',
      Object.assign({}, propsToTransfer, {
        className: s.selectInput,
        defaultValue: props.defaultValue || '',
        id: props.htmlFor,
      }),
      selectOptions
    )
  );
};
export default Select;
//# sourceMappingURL=Select.js.map
