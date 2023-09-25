function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { ContentContainer } from '@codecademy/gamut';
import { css, states } from '@codecademy/gamut-styles';
import * as React from 'react';
import { AppHeaderLink } from '../AppHeaderLink';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledList = /*#__PURE__*/_styled("ul", {
  target: "e9an02l1",
  label: "StyledList"
})(css({
  listStyle: "none",
  padding: 0
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ21CIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEFwcEhlYWRlckxpbmsgfSBmcm9tICcuLi9BcHBIZWFkZXJMaW5rJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVyRHJvcGRvd25JdGVtLFxuICBBcHBIZWFkZXJMaW5rSXRlbSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBBcHBIZWFkZXJMaW5rU2VjdGlvbnNQcm9wcyA9IHtcbiAgYWN0aW9uOiBBcHBIZWFkZXJDbGlja0hhbmRsZXI7XG4gIGl0ZW06IEFwcEhlYWRlckRyb3Bkb3duSXRlbTtcbiAgcmVmPzogUmVhY3QuUmVmT2JqZWN0PEhUTUxVTGlzdEVsZW1lbnQ+O1xuICByb2xlPzogc3RyaW5nO1xuICBpZD86IHN0cmluZztcbiAgc3R5bGU/OiB7fTtcbiAgc2hvd0ljb24/OiBib29sZWFuO1xuICBvbktleURvd24/OiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG4gIG9uRm9jdXM/OiAoKSA9PiB2b2lkO1xuICBvbkJsdXI/OiAoKSA9PiB2b2lkO1xuICBtb2JpbGU/OiBib29sZWFuO1xufTtcblxudHlwZSBMaW5rQ29tcG9uZW50UHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbTtcbiAgc2hvd0xpbmVCcmVhaz86IGJvb2xlYW47XG4gIHNob3dJY29uPzogYm9vbGVhbjtcbiAgb25LZXlEb3duPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xufTtcblxudHlwZSBTdHlsZWRMaXN0SXRlbVByb3BzID0ge1xuICBzaG93TGluZUJyZWFrPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFN0eWxlZExpc3QgPSBzdHlsZWQudWwoXG4gIGNzcyh7XG4gICAgbGlzdFN0eWxlOiBgbm9uZWAsXG4gICAgcGFkZGluZzogMCxcbiAgfSlcbik7XG5cbmNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkLmxpPFN0eWxlZExpc3RJdGVtUHJvcHM+KFxuICBzdGF0ZXMoe1xuICAgIHNob3dMaW5lQnJlYWs6IHtcbiAgICAgICcmOmJlZm9yZSc6IHtcbiAgICAgICAgYmc6IGBncmF5LTYwMGAsXG4gICAgICAgIGNvbnRlbnQ6IGAnJ2AsXG4gICAgICAgIGRpc3BsYXk6IGBibG9ja2AsXG4gICAgICAgIGhlaWdodDogYDFweGAsXG4gICAgICAgIG1hcmdpbjogYDAuNXJlbSAxLjVyZW1gLFxuICAgICAgICB3aWR0aDogYGNhbGMoMTAwJSAtIDNyZW0pYCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSlcbik7XG5cbmNvbnN0IExpbmtDb21wb25lbnQ6IFJlYWN0LkZDPExpbmtDb21wb25lbnRQcm9wcz4gPSAoe1xuICBhY3Rpb24sXG4gIGxpbmssXG4gIHNob3dJY29uID0gZmFsc2UsXG4gIHNob3dMaW5lQnJlYWsgPSBmYWxzZSxcbiAgb25LZXlEb3duLFxufSkgPT4gKFxuICA8U3R5bGVkTGlzdEl0ZW0gcm9sZT1cIm5vbmVcIiBzaG93TGluZUJyZWFrPXtzaG93TGluZUJyZWFrfT5cbiAgICA8QXBwSGVhZGVyTGlua1xuICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICBpdGVtPXtsaW5rfVxuICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICBweT17MTZ9XG4gICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAvPlxuICA8L1N0eWxlZExpc3RJdGVtPlxuKTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlckxpbmtTZWN0aW9ucyA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxVTGlzdEVsZW1lbnQsXG4gIEFwcEhlYWRlckxpbmtTZWN0aW9uc1Byb3BzXG4+KFxuICAoXG4gICAgeyBhY3Rpb24sIGl0ZW0sIHNob3dJY29uID0gZmFsc2UsIG9uS2V5RG93biwgbW9iaWxlID0gZmFsc2UsIC4uLnByb3BzIH0sXG4gICAgcmVmXG4gICkgPT4gKFxuICAgIDxDb250ZW50Q29udGFpbmVyIHNpemU9e21vYmlsZSA/ICdtZWRpdW0nIDogJ3NtYWxsJ30+XG4gICAgICA8U3R5bGVkTGlzdCByZWY9e3JlZn0gey4uLnByb3BzfT5cbiAgICAgICAge2l0ZW0udHlwZSA9PT0gJ3Byb2ZpbGUtZHJvcGRvd24nXG4gICAgICAgICAgPyBpdGVtLnBvcG92ZXIubWFwKChsaW5rU2VjdGlvbjogQXBwSGVhZGVyTGlua0l0ZW1bXSwgc2VjdGlvbkluZGV4KSA9PlxuICAgICAgICAgICAgICBsaW5rU2VjdGlvbi5tYXAoKGxpbms6IEFwcEhlYWRlckxpbmtJdGVtLCBsaW5rSW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8TGlua0NvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICAgICAgICAgICAgICBrZXk9e2xpbmsuaWR9XG4gICAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICAgIGxpbms9e2xpbmt9XG4gICAgICAgICAgICAgICAgICBzaG93TGluZUJyZWFrPXtzZWN0aW9uSW5kZXggIT09IDAgJiYgbGlua0luZGV4ID09PSAwfVxuICAgICAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBpdGVtLnBvcG92ZXIubWFwKChsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8TGlua0NvbXBvbmVudFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgICAgICAgICAgIGtleT17bGluay5pZH1cbiAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICBsaW5rPXtsaW5rfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICA8L1N0eWxlZExpc3Q+XG4gICAgPC9Db250ZW50Q29udGFpbmVyPlxuICApXG4pO1xuIl19 */");
var StyledListItem = /*#__PURE__*/_styled("li", {
  target: "e9an02l0",
  label: "StyledListItem"
})(states({
  showLineBreak: {
    '&:before': {
      bg: "gray-600",
      content: "''",
      display: "block",
      height: "1px",
      margin: "0.5rem 1.5rem",
      width: "calc(100% - 3rem)"
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q3VCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEFwcEhlYWRlckxpbmsgfSBmcm9tICcuLi9BcHBIZWFkZXJMaW5rJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVyRHJvcGRvd25JdGVtLFxuICBBcHBIZWFkZXJMaW5rSXRlbSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBBcHBIZWFkZXJMaW5rU2VjdGlvbnNQcm9wcyA9IHtcbiAgYWN0aW9uOiBBcHBIZWFkZXJDbGlja0hhbmRsZXI7XG4gIGl0ZW06IEFwcEhlYWRlckRyb3Bkb3duSXRlbTtcbiAgcmVmPzogUmVhY3QuUmVmT2JqZWN0PEhUTUxVTGlzdEVsZW1lbnQ+O1xuICByb2xlPzogc3RyaW5nO1xuICBpZD86IHN0cmluZztcbiAgc3R5bGU/OiB7fTtcbiAgc2hvd0ljb24/OiBib29sZWFuO1xuICBvbktleURvd24/OiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG4gIG9uRm9jdXM/OiAoKSA9PiB2b2lkO1xuICBvbkJsdXI/OiAoKSA9PiB2b2lkO1xuICBtb2JpbGU/OiBib29sZWFuO1xufTtcblxudHlwZSBMaW5rQ29tcG9uZW50UHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbTtcbiAgc2hvd0xpbmVCcmVhaz86IGJvb2xlYW47XG4gIHNob3dJY29uPzogYm9vbGVhbjtcbiAgb25LZXlEb3duPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xufTtcblxudHlwZSBTdHlsZWRMaXN0SXRlbVByb3BzID0ge1xuICBzaG93TGluZUJyZWFrPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFN0eWxlZExpc3QgPSBzdHlsZWQudWwoXG4gIGNzcyh7XG4gICAgbGlzdFN0eWxlOiBgbm9uZWAsXG4gICAgcGFkZGluZzogMCxcbiAgfSlcbik7XG5cbmNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkLmxpPFN0eWxlZExpc3RJdGVtUHJvcHM+KFxuICBzdGF0ZXMoe1xuICAgIHNob3dMaW5lQnJlYWs6IHtcbiAgICAgICcmOmJlZm9yZSc6IHtcbiAgICAgICAgYmc6IGBncmF5LTYwMGAsXG4gICAgICAgIGNvbnRlbnQ6IGAnJ2AsXG4gICAgICAgIGRpc3BsYXk6IGBibG9ja2AsXG4gICAgICAgIGhlaWdodDogYDFweGAsXG4gICAgICAgIG1hcmdpbjogYDAuNXJlbSAxLjVyZW1gLFxuICAgICAgICB3aWR0aDogYGNhbGMoMTAwJSAtIDNyZW0pYCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSlcbik7XG5cbmNvbnN0IExpbmtDb21wb25lbnQ6IFJlYWN0LkZDPExpbmtDb21wb25lbnRQcm9wcz4gPSAoe1xuICBhY3Rpb24sXG4gIGxpbmssXG4gIHNob3dJY29uID0gZmFsc2UsXG4gIHNob3dMaW5lQnJlYWsgPSBmYWxzZSxcbiAgb25LZXlEb3duLFxufSkgPT4gKFxuICA8U3R5bGVkTGlzdEl0ZW0gcm9sZT1cIm5vbmVcIiBzaG93TGluZUJyZWFrPXtzaG93TGluZUJyZWFrfT5cbiAgICA8QXBwSGVhZGVyTGlua1xuICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICBpdGVtPXtsaW5rfVxuICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICBweT17MTZ9XG4gICAgICBzaG93SWNvbj17c2hvd0ljb259XG4gICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAvPlxuICA8L1N0eWxlZExpc3RJdGVtPlxuKTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlckxpbmtTZWN0aW9ucyA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxVTGlzdEVsZW1lbnQsXG4gIEFwcEhlYWRlckxpbmtTZWN0aW9uc1Byb3BzXG4+KFxuICAoXG4gICAgeyBhY3Rpb24sIGl0ZW0sIHNob3dJY29uID0gZmFsc2UsIG9uS2V5RG93biwgbW9iaWxlID0gZmFsc2UsIC4uLnByb3BzIH0sXG4gICAgcmVmXG4gICkgPT4gKFxuICAgIDxDb250ZW50Q29udGFpbmVyIHNpemU9e21vYmlsZSA/ICdtZWRpdW0nIDogJ3NtYWxsJ30+XG4gICAgICA8U3R5bGVkTGlzdCByZWY9e3JlZn0gey4uLnByb3BzfT5cbiAgICAgICAge2l0ZW0udHlwZSA9PT0gJ3Byb2ZpbGUtZHJvcGRvd24nXG4gICAgICAgICAgPyBpdGVtLnBvcG92ZXIubWFwKChsaW5rU2VjdGlvbjogQXBwSGVhZGVyTGlua0l0ZW1bXSwgc2VjdGlvbkluZGV4KSA9PlxuICAgICAgICAgICAgICBsaW5rU2VjdGlvbi5tYXAoKGxpbms6IEFwcEhlYWRlckxpbmtJdGVtLCBsaW5rSW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8TGlua0NvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICAgICAgICAgICAgICBrZXk9e2xpbmsuaWR9XG4gICAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICAgIGxpbms9e2xpbmt9XG4gICAgICAgICAgICAgICAgICBzaG93TGluZUJyZWFrPXtzZWN0aW9uSW5kZXggIT09IDAgJiYgbGlua0luZGV4ID09PSAwfVxuICAgICAgICAgICAgICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBpdGVtLnBvcG92ZXIubWFwKChsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8TGlua0NvbXBvbmVudFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgICAgICAgICAgIGtleT17bGluay5pZH1cbiAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICBsaW5rPXtsaW5rfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICA8L1N0eWxlZExpc3Q+XG4gICAgPC9Db250ZW50Q29udGFpbmVyPlxuICApXG4pO1xuIl19 */");
var LinkComponent = function LinkComponent(_ref) {
  var action = _ref.action,
    link = _ref.link,
    _ref$showIcon = _ref.showIcon,
    showIcon = _ref$showIcon === void 0 ? false : _ref$showIcon,
    _ref$showLineBreak = _ref.showLineBreak,
    showLineBreak = _ref$showLineBreak === void 0 ? false : _ref$showLineBreak,
    onKeyDown = _ref.onKeyDown;
  return /*#__PURE__*/_jsx(StyledListItem, {
    role: "none",
    showLineBreak: showLineBreak,
    children: /*#__PURE__*/_jsx(AppHeaderLink, {
      action: action,
      item: link,
      onKeyDown: onKeyDown,
      py: 16,
      showIcon: showIcon,
      tabIndex: "-1"
    })
  });
};
export var AppHeaderLinkSections = /*#__PURE__*/React.forwardRef(function AppHeaderLinkSections(_ref2, ref) {
  var action = _ref2.action,
    item = _ref2.item,
    _ref2$showIcon = _ref2.showIcon,
    showIcon = _ref2$showIcon === void 0 ? false : _ref2$showIcon,
    onKeyDown = _ref2.onKeyDown,
    _ref2$mobile = _ref2.mobile,
    mobile = _ref2$mobile === void 0 ? false : _ref2$mobile,
    props = _objectWithoutProperties(_ref2, ["action", "item", "showIcon", "onKeyDown", "mobile"]);
  return /*#__PURE__*/_jsx(ContentContainer, {
    size: mobile ? 'medium' : 'small',
    children: /*#__PURE__*/_jsx(StyledList, _objectSpread(_objectSpread({
      ref: ref
    }, props), {}, {
      children: item.type === 'profile-dropdown' ? item.popover.map(function (linkSection, sectionIndex) {
        return linkSection.map(function (link, linkIndex) {
          return /*#__PURE__*/_jsx(LinkComponent, {
            onKeyDown: onKeyDown,
            action: action,
            link: link,
            showLineBreak: sectionIndex !== 0 && linkIndex === 0,
            showIcon: showIcon
          }, link.id);
        });
      }) : item.popover.map(function (link) {
        return /*#__PURE__*/_jsx(LinkComponent, {
          onKeyDown: onKeyDown,
          action: action,
          link: link
        }, link.id);
      })
    }))
  });
});