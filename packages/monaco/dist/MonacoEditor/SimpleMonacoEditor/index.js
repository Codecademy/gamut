function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _templateObject;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from '@emotion/styled';
import React, { Component } from 'react';
import ReactMonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
var InnerEditor = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding-top: 0.95rem;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n"])));
export var SimpleMonacoEditor = /*#__PURE__*/function (_Component) {
  _inherits(SimpleMonacoEditor, _Component);

  var _super = _createSuper(SimpleMonacoEditor);

  function SimpleMonacoEditor() {
    var _this;

    _classCallCheck(this, SimpleMonacoEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.editorDidMount = function (editor) {
      _this.editor = editor;

      _this.props.setEditor(editor);
    };

    _this.editorWillMount = function (monaco) {
      _this.props.setMonaco(monaco);
    };

    return _this;
  }

  _createClass(SimpleMonacoEditor, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(prevProps) {
      return this.props.file !== prevProps.file || this.props.languageId !== prevProps.languageId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(ReactResizeDetector, {
        handleHeight: true,
        handleWidth: true,
        onResize: function onResize(width, height) {
          var _this2$editor;

          width > 0 && height > 0 && ((_this2$editor = _this2.editor) === null || _this2$editor === void 0 ? void 0 : _this2$editor.layout());
        },
        refreshMode: "debounce",
        refreshRate: 500
      }, /*#__PURE__*/React.createElement(InnerEditor, {
        "data-language-id": this.props.languageId
      }, /*#__PURE__*/React.createElement(ReactMonacoEditor, {
        editorDidMount: this.editorDidMount,
        editorWillMount: this.editorWillMount,
        onChange: this.props.onChange,
        options: this.props.options,
        theme: this.props.options.theme,
        value: this.props.file.content
      })));
    }
  }]);

  return SimpleMonacoEditor;
}(Component);