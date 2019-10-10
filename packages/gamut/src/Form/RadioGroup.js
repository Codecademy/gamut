import React, { cloneElement } from 'react';
const RadioGroup = ({ children, onChange, htmlForPrefix, name, ...rest }) =>
  React.createElement(
    'div',
    Object.assign({}, rest),
    React.Children.map(children, (child, index) =>
      cloneElement(child, {
        onChange: onChange,
        htmlFor: `${htmlForPrefix}-${index}`,
        name: name,
      })
    )
  );
export default RadioGroup;
//# sourceMappingURL=RadioGroup.js.map
