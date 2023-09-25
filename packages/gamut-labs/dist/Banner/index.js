function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Box, IconButton, Markdown, TextButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import { useMemo } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var bannerVariants = ['navy', 'yellow'];
var isAllowedVariant = function isAllowedVariant(variant) {
  return bannerVariants.includes(variant);
};
var BannerContainer = /*#__PURE__*/_styled(Background, {
  target: "e1aspl8w1",
  label: "BannerContainer"
})(system.css({
  width: '100%',
  p: 4,
  display: 'grid',
  gridTemplateColumns: '2rem minmax(0, 1fr) 2rem',
  gridTemplateAreas: "'empty content close'",
  columnGap: 8,
  alignItems: 'center',
  textAlign: 'center'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CYW5uZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCd0IiLCJmaWxlIjoiLi4vLi4vc3JjL0Jhbm5lci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEljb25CdXR0b24sIE1hcmtkb3duLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgTWluaURlbGV0ZUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBCYWNrZ3JvdW5kUHJvcHMsIHN5c3RlbSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBCYW5uZXJWYXJpYW50ID0gdHlwZW9mIGJhbm5lclZhcmlhbnRzW251bWJlcl07XG5jb25zdCBiYW5uZXJWYXJpYW50cyA9IFsnbmF2eScsICd5ZWxsb3cnXSBhcyBjb25zdDtcblxuY29uc3QgaXNBbGxvd2VkVmFyaWFudCA9IChcbiAgdmFyaWFudDogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogdmFyaWFudCBpcyBCYW5uZXJWYXJpYW50ID0+XG4gIGJhbm5lclZhcmlhbnRzLmluY2x1ZGVzKHZhcmlhbnQgYXMgQmFubmVyVmFyaWFudCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFubmVyUHJvcHMgZXh0ZW5kcyBPbWl0PEJhY2tncm91bmRQcm9wcywgJ2JnJz4ge1xuICBjaGlsZHJlbjogc3RyaW5nO1xuICAvKiogVmlzdWFsIHZhcmlhdGlvbiBmb3IgYmFubmVycywgZGVmYXVsdHMgdG8gbmF2eSAqL1xuICB2YXJpYW50PzogQmFubmVyVmFyaWFudCB8IG51bGw7XG4gIC8qKiAgQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xvc2VzIHRoZSBiYW5uZXIuICovXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIC8qKiBDYWxsIHRvIGFjdGlvbiBjbGljayBjYWxsYmFjayAqL1xuICBvbkN0YUNsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgQmFubmVyQ29udGFpbmVyID0gc3R5bGVkKEJhY2tncm91bmQpKFxuICBzeXN0ZW0uY3NzKHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHA6IDQsXG4gICAgZGlzcGxheTogJ2dyaWQnLFxuICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICcycmVtIG1pbm1heCgwLCAxZnIpIDJyZW0nLFxuICAgIGdyaWRUZW1wbGF0ZUFyZWFzOiBcIidlbXB0eSBjb250ZW50IGNsb3NlJ1wiLFxuICAgIGNvbHVtbkdhcDogOCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB9KVxuKTtcblxuY29uc3QgQmFubmVyTWFya2Rvd24gPSBzdHlsZWQoTWFya2Rvd24pKHN5c3RlbS5jc3MoeyBmb250U2l6ZTogJ2luaGVyaXQnIH0pKTtcblxuY29uc3QgYmluZEJhbm5lckFuY2hvciA9IChvbkN0YUNsaWNrPzogQmFubmVyUHJvcHNbJ29uQ3RhQ2xpY2snXSkgPT4gKHtcbiAgYWxsb3dlZEF0dHJpYnV0ZXM6IFsnaHJlZicsICd0YXJnZXQnXSxcbiAgY29tcG9uZW50OiBUZXh0QnV0dG9uLFxuICBwcm9jZXNzTm9kZTogKG5vZGU6IHVua25vd24sIHByb3BzOiB7IG9uQ2xpY2s/OiAoKSA9PiB2b2lkIH0pID0+IChcbiAgICA8VGV4dEJ1dHRvblxuICAgICAgey4uLnByb3BzfVxuICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICBvbkN0YUNsaWNrPy4oKTtcbiAgICAgICAgcHJvcHM/Lm9uQ2xpY2s/LigpO1xuICAgICAgfX1cbiAgICAgIG14PXs0fVxuICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgIHRhcmdldD1cIl9CTEFOS1wiXG4gICAgLz5cbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQmFubmVyOiBSZWFjdC5GQzxCYW5uZXJQcm9wcz4gPSAoe1xuICBjaGlsZHJlbixcbiAgdmFyaWFudDogcmF3VmFyaWFudCxcbiAgb25DdGFDbGljayxcbiAgb25DbG9zZSxcbiAgLi4ucmVzdFxufTogQmFubmVyUHJvcHMpID0+IHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgYTogYmluZEJhbm5lckFuY2hvcihvbkN0YUNsaWNrKSxcbiAgICB9KSxcbiAgICBbb25DdGFDbGlja11cbiAgKTtcblxuICAvLyBDb250ZW50ZnVsIGlzIHVuYWJsZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNvbW11bmljYXRlIHdoYXQgdmFsdWVzIGl0IGRvZXMvZG9lc24ndCBhbGxvdyBpbiB0aGVzZSBraW5kcyBvZiBmaWVsZHMsXG4gIC8vIHdoaWNoIG1ha2VzIGl0IGRpZmZpY3VsdCBmb3IgdXMgdG8gZW5zdXJlIHRoZSBDb250ZW50ZnVsIGNvbmZpZ3VyYXRpb24gaGFzbid0IGRpdmVyZ2VkIGZyb20gR2FtdXQgcmVzdHJpY3Rpb25zLlxuICBjb25zdCB2YXJpYW50ID0gaXNBbGxvd2VkVmFyaWFudChyYXdWYXJpYW50KSA/IHJhd1ZhcmlhbnQgOiAnbmF2eSc7XG5cbiAgcmV0dXJuIChcbiAgICA8QmFubmVyQ29udGFpbmVyIHsuLi5yZXN0fSBiZz17dmFyaWFudH0+XG4gICAgICA8Qm94IGdyaWRBcmVhPVwiY29udGVudFwiIGZvbnRTaXplPVwiaW5oZXJpdFwiPlxuICAgICAgICA8QmFubmVyTWFya2Rvd25cbiAgICAgICAgICBvdmVycmlkZXM9e292ZXJyaWRlc31cbiAgICAgICAgICB0ZXh0PXtjaGlsZHJlbn1cbiAgICAgICAgICBza2lwRGVmYXVsdE92ZXJyaWRlcz17eyBhOiB0cnVlIH19XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggZ3JpZEFyZWE9XCJjbG9zZVwiPlxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cImRpc21pc3NcIlxuICAgICAgICAgIGljb249e01pbmlEZWxldGVJY29ufVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICA8L0Jhbm5lckNvbnRhaW5lcj5cbiAgKTtcbn07XG4iXX0= */");
var BannerMarkdown = /*#__PURE__*/_styled(Markdown, {
  target: "e1aspl8w0",
  label: "BannerMarkdown"
})(system.css({
  fontSize: 'inherit'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CYW5uZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDdUIiLCJmaWxlIjoiLi4vLi4vc3JjL0Jhbm5lci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEljb25CdXR0b24sIE1hcmtkb3duLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgTWluaURlbGV0ZUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBCYWNrZ3JvdW5kUHJvcHMsIHN5c3RlbSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBCYW5uZXJWYXJpYW50ID0gdHlwZW9mIGJhbm5lclZhcmlhbnRzW251bWJlcl07XG5jb25zdCBiYW5uZXJWYXJpYW50cyA9IFsnbmF2eScsICd5ZWxsb3cnXSBhcyBjb25zdDtcblxuY29uc3QgaXNBbGxvd2VkVmFyaWFudCA9IChcbiAgdmFyaWFudDogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogdmFyaWFudCBpcyBCYW5uZXJWYXJpYW50ID0+XG4gIGJhbm5lclZhcmlhbnRzLmluY2x1ZGVzKHZhcmlhbnQgYXMgQmFubmVyVmFyaWFudCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFubmVyUHJvcHMgZXh0ZW5kcyBPbWl0PEJhY2tncm91bmRQcm9wcywgJ2JnJz4ge1xuICBjaGlsZHJlbjogc3RyaW5nO1xuICAvKiogVmlzdWFsIHZhcmlhdGlvbiBmb3IgYmFubmVycywgZGVmYXVsdHMgdG8gbmF2eSAqL1xuICB2YXJpYW50PzogQmFubmVyVmFyaWFudCB8IG51bGw7XG4gIC8qKiAgQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xvc2VzIHRoZSBiYW5uZXIuICovXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIC8qKiBDYWxsIHRvIGFjdGlvbiBjbGljayBjYWxsYmFjayAqL1xuICBvbkN0YUNsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgQmFubmVyQ29udGFpbmVyID0gc3R5bGVkKEJhY2tncm91bmQpKFxuICBzeXN0ZW0uY3NzKHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHA6IDQsXG4gICAgZGlzcGxheTogJ2dyaWQnLFxuICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICcycmVtIG1pbm1heCgwLCAxZnIpIDJyZW0nLFxuICAgIGdyaWRUZW1wbGF0ZUFyZWFzOiBcIidlbXB0eSBjb250ZW50IGNsb3NlJ1wiLFxuICAgIGNvbHVtbkdhcDogOCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB9KVxuKTtcblxuY29uc3QgQmFubmVyTWFya2Rvd24gPSBzdHlsZWQoTWFya2Rvd24pKHN5c3RlbS5jc3MoeyBmb250U2l6ZTogJ2luaGVyaXQnIH0pKTtcblxuY29uc3QgYmluZEJhbm5lckFuY2hvciA9IChvbkN0YUNsaWNrPzogQmFubmVyUHJvcHNbJ29uQ3RhQ2xpY2snXSkgPT4gKHtcbiAgYWxsb3dlZEF0dHJpYnV0ZXM6IFsnaHJlZicsICd0YXJnZXQnXSxcbiAgY29tcG9uZW50OiBUZXh0QnV0dG9uLFxuICBwcm9jZXNzTm9kZTogKG5vZGU6IHVua25vd24sIHByb3BzOiB7IG9uQ2xpY2s/OiAoKSA9PiB2b2lkIH0pID0+IChcbiAgICA8VGV4dEJ1dHRvblxuICAgICAgey4uLnByb3BzfVxuICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICBvbkN0YUNsaWNrPy4oKTtcbiAgICAgICAgcHJvcHM/Lm9uQ2xpY2s/LigpO1xuICAgICAgfX1cbiAgICAgIG14PXs0fVxuICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgIHRhcmdldD1cIl9CTEFOS1wiXG4gICAgLz5cbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQmFubmVyOiBSZWFjdC5GQzxCYW5uZXJQcm9wcz4gPSAoe1xuICBjaGlsZHJlbixcbiAgdmFyaWFudDogcmF3VmFyaWFudCxcbiAgb25DdGFDbGljayxcbiAgb25DbG9zZSxcbiAgLi4ucmVzdFxufTogQmFubmVyUHJvcHMpID0+IHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgYTogYmluZEJhbm5lckFuY2hvcihvbkN0YUNsaWNrKSxcbiAgICB9KSxcbiAgICBbb25DdGFDbGlja11cbiAgKTtcblxuICAvLyBDb250ZW50ZnVsIGlzIHVuYWJsZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNvbW11bmljYXRlIHdoYXQgdmFsdWVzIGl0IGRvZXMvZG9lc24ndCBhbGxvdyBpbiB0aGVzZSBraW5kcyBvZiBmaWVsZHMsXG4gIC8vIHdoaWNoIG1ha2VzIGl0IGRpZmZpY3VsdCBmb3IgdXMgdG8gZW5zdXJlIHRoZSBDb250ZW50ZnVsIGNvbmZpZ3VyYXRpb24gaGFzbid0IGRpdmVyZ2VkIGZyb20gR2FtdXQgcmVzdHJpY3Rpb25zLlxuICBjb25zdCB2YXJpYW50ID0gaXNBbGxvd2VkVmFyaWFudChyYXdWYXJpYW50KSA/IHJhd1ZhcmlhbnQgOiAnbmF2eSc7XG5cbiAgcmV0dXJuIChcbiAgICA8QmFubmVyQ29udGFpbmVyIHsuLi5yZXN0fSBiZz17dmFyaWFudH0+XG4gICAgICA8Qm94IGdyaWRBcmVhPVwiY29udGVudFwiIGZvbnRTaXplPVwiaW5oZXJpdFwiPlxuICAgICAgICA8QmFubmVyTWFya2Rvd25cbiAgICAgICAgICBvdmVycmlkZXM9e292ZXJyaWRlc31cbiAgICAgICAgICB0ZXh0PXtjaGlsZHJlbn1cbiAgICAgICAgICBza2lwRGVmYXVsdE92ZXJyaWRlcz17eyBhOiB0cnVlIH19XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3ggZ3JpZEFyZWE9XCJjbG9zZVwiPlxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cImRpc21pc3NcIlxuICAgICAgICAgIGljb249e01pbmlEZWxldGVJY29ufVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICA8L0Jhbm5lckNvbnRhaW5lcj5cbiAgKTtcbn07XG4iXX0= */");
var bindBannerAnchor = function bindBannerAnchor(onCtaClick) {
  return {
    allowedAttributes: ['href', 'target'],
    component: TextButton,
    processNode: function processNode(node, props) {
      return /*#__PURE__*/_jsx(TextButton, _objectSpread(_objectSpread({}, props), {}, {
        onClick: function onClick() {
          var _props$onClick;
          onCtaClick === null || onCtaClick === void 0 ? void 0 : onCtaClick();
          props === null || props === void 0 ? void 0 : (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props);
        },
        mx: 4,
        size: "small",
        target: "_BLANK"
      }));
    }
  };
};
export var Banner = function Banner(_ref) {
  var children = _ref.children,
    rawVariant = _ref.variant,
    onCtaClick = _ref.onCtaClick,
    onClose = _ref.onClose,
    rest = _objectWithoutProperties(_ref, ["children", "variant", "onCtaClick", "onClose"]);
  var overrides = useMemo(function () {
    return {
      a: bindBannerAnchor(onCtaClick)
    };
  }, [onCtaClick]);

  // Contentful is unable to programmatically communicate what values it does/doesn't allow in these kinds of fields,
  // which makes it difficult for us to ensure the Contentful configuration hasn't diverged from Gamut restrictions.
  var variant = isAllowedVariant(rawVariant) ? rawVariant : 'navy';
  return /*#__PURE__*/_jsxs(BannerContainer, _objectSpread(_objectSpread({}, rest), {}, {
    bg: variant,
    children: [/*#__PURE__*/_jsx(Box, {
      gridArea: "content",
      fontSize: "inherit",
      children: /*#__PURE__*/_jsx(BannerMarkdown, {
        overrides: overrides,
        text: children,
        skipDefaultOverrides: {
          a: true
        }
      })
    }), /*#__PURE__*/_jsx(Box, {
      gridArea: "close",
      children: /*#__PURE__*/_jsx(IconButton, {
        variant: "secondary",
        size: "small",
        "aria-label": "dismiss",
        icon: MiniDeleteIcon,
        onClick: onClose
      })
    })]
  }));
};