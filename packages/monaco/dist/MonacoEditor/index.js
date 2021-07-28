import React from 'react';
import { SimpleMonacoEditor } from './SimpleMonacoEditor';
export var MonacoEditor = function MonacoEditor(_ref) {
  var file = _ref.file,
      onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement(SimpleMonacoEditor, {
    file: file,
    onChange: onChange,
    options: {},
    setEditor: function setEditor() {},
    setMonaco: function setMonaco() {}
  });
};