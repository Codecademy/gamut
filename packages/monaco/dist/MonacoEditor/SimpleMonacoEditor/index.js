function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Component } from 'react';
import ReactMonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import { jsx as _jsx } from "react/jsx-runtime";
var InnerEditor = /*#__PURE__*/_styled("div", {
  target: "e1t38upn0",
  label: "InnerEditor"
})(process.env.NODE_ENV === "production" ? {
  name: "gegycd",
  styles: "padding-top:0.95rem;position:absolute;top:0;bottom:0;left:0;right:0"
} : {
  name: "gegycd",
  styles: "padding-top:0.95rem;position:absolute;top:0;bottom:0;left:0;right:0",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb25hY29FZGl0b3IvU2ltcGxlTW9uYWNvRWRpdG9yL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFROEIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01vbmFjb0VkaXRvci9TaW1wbGVNb25hY29FZGl0b3IvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHR5cGUgeyBlZGl0b3IgYXMgRWRpdG9yVHlwZSB9IGZyb20gJ21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0TW9uYWNvRWRpdG9yIGZyb20gJ3JlYWN0LW1vbmFjby1lZGl0b3InO1xuaW1wb3J0IFJlYWN0UmVzaXplRGV0ZWN0b3IgZnJvbSAncmVhY3QtcmVzaXplLWRldGVjdG9yJztcblxuaW1wb3J0IHsgRWRpdG9yLCBNb25hY28sIE1vbmFjb0ZpbGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IElubmVyRWRpdG9yID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy10b3A6IDAuOTVyZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuYDtcblxuZXhwb3J0IHR5cGUgU2ltcGxlTW9uYWNvRWRpdG9yUHJvcHMgPSB7XG4gIGZpbGU6IE1vbmFjb0ZpbGU7XG4gIGxhbmd1YWdlSWQ/OiBzdHJpbmc7XG4gIG9uQ2hhbmdlPzogKG5ld1ZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9wdGlvbnM6IEVkaXRvclR5cGUuSVN0YW5kYWxvbmVFZGl0b3JDb25zdHJ1Y3Rpb25PcHRpb25zO1xuICBzZXRFZGl0b3I6IChlZGl0b3I6IEVkaXRvci5JU3RhbmRhbG9uZUNvZGVFZGl0b3IpID0+IHZvaWQ7XG4gIHNldE1vbmFjbzogKG1vbmFjbzogTW9uYWNvKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vbmFjb0VkaXRvciBleHRlbmRzIENvbXBvbmVudDxTaW1wbGVNb25hY29FZGl0b3JQcm9wcz4ge1xuICBlZGl0b3I/OiBFZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yO1xuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShwcmV2UHJvcHM6IFNpbXBsZU1vbmFjb0VkaXRvclByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMuZmlsZSAhPT0gcHJldlByb3BzLmZpbGUgfHxcbiAgICAgIHRoaXMucHJvcHMubGFuZ3VhZ2VJZCAhPT0gcHJldlByb3BzLmxhbmd1YWdlSWRcbiAgICApO1xuICB9XG5cbiAgZWRpdG9yRGlkTW91bnQgPSAoZWRpdG9yOiBFZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yKSA9PiB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgdGhpcy5wcm9wcy5zZXRFZGl0b3IoZWRpdG9yKTtcbiAgfTtcblxuICBlZGl0b3JXaWxsTW91bnQgPSAobW9uYWNvOiBNb25hY28pID0+IHtcbiAgICB0aGlzLnByb3BzLnNldE1vbmFjbyhtb25hY28pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0UmVzaXplRGV0ZWN0b3JcbiAgICAgICAgaGFuZGxlSGVpZ2h0XG4gICAgICAgIGhhbmRsZVdpZHRoXG4gICAgICAgIG9uUmVzaXplPXsod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAod2lkdGggPiAwICYmIGhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yPy5sYXlvdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIHJlZnJlc2hNb2RlPVwiZGVib3VuY2VcIlxuICAgICAgICByZWZyZXNoUmF0ZT17NTAwfVxuICAgICAgPlxuICAgICAgICA8SW5uZXJFZGl0b3IgZGF0YS1sYW5ndWFnZS1pZD17dGhpcy5wcm9wcy5sYW5ndWFnZUlkfT5cbiAgICAgICAgICA8UmVhY3RNb25hY29FZGl0b3JcbiAgICAgICAgICAgIGVkaXRvckRpZE1vdW50PXt0aGlzLmVkaXRvckRpZE1vdW50fVxuICAgICAgICAgICAgZWRpdG9yV2lsbE1vdW50PXt0aGlzLmVkaXRvcldpbGxNb3VudH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfVxuICAgICAgICAgICAgdGhlbWU9e3RoaXMucHJvcHMub3B0aW9ucy50aGVtZX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmZpbGUuY29udGVudH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0lubmVyRWRpdG9yPlxuICAgICAgPC9SZWFjdFJlc2l6ZURldGVjdG9yPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */",
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
    _defineProperty(_assertThisInitialized(_this), "editorDidMount", function (editor) {
      _this.editor = editor;
      _this.props.setEditor(editor);
    });
    _defineProperty(_assertThisInitialized(_this), "editorWillMount", function (monaco) {
      _this.props.setMonaco(monaco);
    });
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
      return /*#__PURE__*/_jsx(ReactResizeDetector, {
        handleHeight: true,
        handleWidth: true,
        onResize: function onResize(width, height) {
          if (width > 0 && height > 0) {
            var _this2$editor;
            (_this2$editor = _this2.editor) === null || _this2$editor === void 0 ? void 0 : _this2$editor.layout();
          }
        },
        refreshMode: "debounce",
        refreshRate: 500,
        children: /*#__PURE__*/_jsx(InnerEditor, {
          "data-language-id": this.props.languageId,
          children: /*#__PURE__*/_jsx(ReactMonacoEditor, {
            editorDidMount: this.editorDidMount,
            editorWillMount: this.editorWillMount,
            onChange: this.props.onChange,
            options: this.props.options,
            theme: this.props.options.theme,
            value: this.props.file.content
          })
        })
      });
    }
  }]);
  return SimpleMonacoEditor;
}(Component);