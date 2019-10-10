import React from 'react';
import cx from 'classnames';
import s from './styles/TextArea.scss';
const TextArea = ({ error, htmlFor, className, ...rest }) => {
  const classNames = cx(
    s.TextArea,
    {
      [s.error]: error,
    },
    className
  );
  return React.createElement(
    'textarea',
    Object.assign({}, rest, { id: htmlFor, className: classNames })
  );
};
export default TextArea;
//# sourceMappingURL=TextArea.js.map
