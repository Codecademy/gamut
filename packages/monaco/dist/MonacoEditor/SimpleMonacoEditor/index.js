function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import _styled from "@emotion/styled/base";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React, { Component } from 'react';
import ReactMonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

var InnerEditor = _styled("div", {
  target: "e1t38upn0",
  label: "InnerEditor"
})(process.env.NODE_ENV === "production" ? {
  name: "gegycd",
  styles: "padding-top:0.95rem;position:absolute;top:0;bottom:0;left:0;right:0"
} : {
  name: "gegycd",
  styles: "padding-top:0.95rem;position:absolute;top:0;bottom:0;left:0;right:0",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb25hY29FZGl0b3IvU2ltcGxlTW9uYWNvRWRpdG9yL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFROEIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01vbmFjb0VkaXRvci9TaW1wbGVNb25hY29FZGl0b3IvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHR5cGUgeyBlZGl0b3IgYXMgRWRpdG9yVHlwZSB9IGZyb20gJ21vbmFjby1lZGl0b3InO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdE1vbmFjb0VkaXRvciBmcm9tICdyZWFjdC1tb25hY28tZWRpdG9yJztcbmltcG9ydCBSZWFjdFJlc2l6ZURldGVjdG9yIGZyb20gJ3JlYWN0LXJlc2l6ZS1kZXRlY3Rvcic7XG5cbmltcG9ydCB7IEVkaXRvciwgTW9uYWNvLCBNb25hY29GaWxlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBJbm5lckVkaXRvciA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctdG9wOiAwLjk1cmVtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbmA7XG5cbmV4cG9ydCB0eXBlIFNpbXBsZU1vbmFjb0VkaXRvclByb3BzID0ge1xuICBmaWxlOiBNb25hY29GaWxlO1xuICBsYW5ndWFnZUlkPzogc3RyaW5nO1xuICBvbkNoYW5nZT86IChuZXdWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvcHRpb25zOiBFZGl0b3JUeXBlLklTdGFuZGFsb25lRWRpdG9yQ29uc3RydWN0aW9uT3B0aW9ucztcbiAgc2V0RWRpdG9yOiAoZWRpdG9yOiBFZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yKSA9PiB2b2lkO1xuICBzZXRNb25hY286IChtb25hY286IE1vbmFjbykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVNb25hY29FZGl0b3IgZXh0ZW5kcyBDb21wb25lbnQ8U2ltcGxlTW9uYWNvRWRpdG9yUHJvcHM+IHtcbiAgZWRpdG9yPzogRWRpdG9yLklTdGFuZGFsb25lQ29kZUVkaXRvcjtcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUocHJldlByb3BzOiBTaW1wbGVNb25hY29FZGl0b3JQcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLmZpbGUgIT09IHByZXZQcm9wcy5maWxlIHx8XG4gICAgICB0aGlzLnByb3BzLmxhbmd1YWdlSWQgIT09IHByZXZQcm9wcy5sYW5ndWFnZUlkXG4gICAgKTtcbiAgfVxuXG4gIGVkaXRvckRpZE1vdW50ID0gKGVkaXRvcjogRWRpdG9yLklTdGFuZGFsb25lQ29kZUVkaXRvcikgPT4ge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgIHRoaXMucHJvcHMuc2V0RWRpdG9yKGVkaXRvcik7XG4gIH07XG5cbiAgZWRpdG9yV2lsbE1vdW50ID0gKG1vbmFjbzogTW9uYWNvKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZXRNb25hY28obW9uYWNvKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdFJlc2l6ZURldGVjdG9yXG4gICAgICAgIGhhbmRsZUhlaWdodFxuICAgICAgICBoYW5kbGVXaWR0aFxuICAgICAgICBvblJlc2l6ZT17KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvcj8ubGF5b3V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICByZWZyZXNoTW9kZT1cImRlYm91bmNlXCJcbiAgICAgICAgcmVmcmVzaFJhdGU9ezUwMH1cbiAgICAgID5cbiAgICAgICAgPElubmVyRWRpdG9yIGRhdGEtbGFuZ3VhZ2UtaWQ9e3RoaXMucHJvcHMubGFuZ3VhZ2VJZH0+XG4gICAgICAgICAgPFJlYWN0TW9uYWNvRWRpdG9yXG4gICAgICAgICAgICBlZGl0b3JEaWRNb3VudD17dGhpcy5lZGl0b3JEaWRNb3VudH1cbiAgICAgICAgICAgIGVkaXRvcldpbGxNb3VudD17dGhpcy5lZGl0b3JXaWxsTW91bnR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc31cbiAgICAgICAgICAgIHRoZW1lPXt0aGlzLnByb3BzLm9wdGlvbnMudGhlbWV9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5maWxlLmNvbnRlbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Jbm5lckVkaXRvcj5cbiAgICAgIDwvUmVhY3RSZXNpemVEZXRlY3Rvcj5cbiAgICApO1xuICB9XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

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
          if (width > 0 && height > 0) {
            var _this2$editor;

            (_this2$editor = _this2.editor) === null || _this2$editor === void 0 ? void 0 : _this2$editor.layout();
          }
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