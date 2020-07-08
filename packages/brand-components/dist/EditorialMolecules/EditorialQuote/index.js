import React from 'react';
import s from './styles.module.scss';
export var EditorialQuote = function EditorialQuote(_ref) {
  var quote = _ref.quote;
  return React.createElement("q", {
    className: s.quote
  }, quote);
};
export default EditorialQuote;