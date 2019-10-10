import React from 'react';
import cx from 'classnames';
import s from './styles/Radio.scss';
const Radio = ({
  name,
  value,
  label,
  checked,
  className,
  htmlFor,
  onChange,
  required,
  ...rest
}) => {
  const classNames = cx(s.Radio, className);
  return React.createElement(
    'div',
    { className: classNames },
    React.createElement(
      'input',
      Object.assign(
        {
          className: s.radioInput,
          id: htmlFor,
          name: name,
          required: required,
          type: 'radio',
          checked: checked,
          onChange: onChange,
          value: value,
        },
        rest
      )
    ),
    React.createElement(
      'label',
      { htmlFor: htmlFor, className: s.radioLabel },
      label
    )
  );
};
export default Radio;
//# sourceMappingURL=Radio.js.map
