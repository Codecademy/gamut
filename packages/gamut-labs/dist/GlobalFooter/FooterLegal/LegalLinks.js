import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Anchor } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
var urls = [['Privacy Policy', '/policy', 'policy'], ['Cookie Policy', '/cookie-policy', 'cookie_policy'], ['Do Not Sell My Personal Information', 'https://privacy.codecademy.com', 'data_privacy'], ['Terms', '/terms', 'terms']];
var LinksList = /*#__PURE__*/_styled("ul", {
  target: "ez6q0cs1",
  label: "LinksList"
})("align-items:center;display:flex;flex-wrap:wrap;justify-content:center;list-style-type:none;margin-bottom:0.5rem;padding-left:0;", theme.breakpoints.md, "{justify-content:flex-start;display:inline-flex;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTGVnYWxMaW5rcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0IyQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL0xlZ2FsTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IHVybHMgPSBbXG4gIFsnUHJpdmFjeSBQb2xpY3knLCAnL3BvbGljeScsICdwb2xpY3knXSxcbiAgWydDb29raWUgUG9saWN5JywgJy9jb29raWUtcG9saWN5JywgJ2Nvb2tpZV9wb2xpY3knXSxcbiAgW1xuICAgICdEbyBOb3QgU2VsbCBNeSBQZXJzb25hbCBJbmZvcm1hdGlvbicsXG4gICAgJ2h0dHBzOi8vcHJpdmFjeS5jb2RlY2FkZW15LmNvbScsXG4gICAgJ2RhdGFfcHJpdmFjeScsXG4gIF0sXG4gIFsnVGVybXMnLCAnL3Rlcm1zJywgJ3Rlcm1zJ10sXG5dO1xuXG5jb25zdCBMaW5rc0xpc3QgPSBzdHlsZWQudWxgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgfVxuYDtcblxuY29uc3QgTGlua3NJdGVtID0gc3R5bGVkLmxpYFxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJ3wnO1xuICAgIG1hcmdpbjogMCAwLjM3NXJlbTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gIH1cblxuICAmOmxhc3Qtb2YtdHlwZTo6YWZ0ZXIge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCB0eXBlIExlZ2FsTGlua3NQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IExlZ2FsTGlua3M6IFJlYWN0LkZDPExlZ2FsTGlua3NQcm9wcz4gPSAoeyBvbkNsaWNrIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TGlua3NMaXN0IGFyaWEtbGFiZWw9XCJMZWdhbFwiIHJvbGU9XCJsaXN0XCI+XG4gICAgICB7dXJscy5tYXAoKFtjaGlsZHJlbiwgaHJlZiwgdGFyZ2V0XSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxMaW5rc0l0ZW0ga2V5PXtocmVmfT5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldCB9KX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvTGlua3NJdGVtPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9MaW5rc0xpc3Q+XG4gICk7XG59O1xuIl19 */"));
var LinksItem = /*#__PURE__*/_styled("li", {
  target: "ez6q0cs0",
  label: "LinksItem"
})(process.env.NODE_ENV === "production" ? {
  name: "1idsucm",
  styles: "&::after{content:'|';margin:0 0.375rem;font-size:1rem;}&:last-of-type::after{opacity:0;}"
} : {
  name: "1idsucm",
  styles: "&::after{content:'|';margin:0 0.375rem;font-size:1rem;}&:last-of-type::after{opacity:0;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTGVnYWxMaW5rcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUMyQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL0xlZ2FsTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IHVybHMgPSBbXG4gIFsnUHJpdmFjeSBQb2xpY3knLCAnL3BvbGljeScsICdwb2xpY3knXSxcbiAgWydDb29raWUgUG9saWN5JywgJy9jb29raWUtcG9saWN5JywgJ2Nvb2tpZV9wb2xpY3knXSxcbiAgW1xuICAgICdEbyBOb3QgU2VsbCBNeSBQZXJzb25hbCBJbmZvcm1hdGlvbicsXG4gICAgJ2h0dHBzOi8vcHJpdmFjeS5jb2RlY2FkZW15LmNvbScsXG4gICAgJ2RhdGFfcHJpdmFjeScsXG4gIF0sXG4gIFsnVGVybXMnLCAnL3Rlcm1zJywgJ3Rlcm1zJ10sXG5dO1xuXG5jb25zdCBMaW5rc0xpc3QgPSBzdHlsZWQudWxgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgfVxuYDtcblxuY29uc3QgTGlua3NJdGVtID0gc3R5bGVkLmxpYFxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJ3wnO1xuICAgIG1hcmdpbjogMCAwLjM3NXJlbTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gIH1cblxuICAmOmxhc3Qtb2YtdHlwZTo6YWZ0ZXIge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCB0eXBlIExlZ2FsTGlua3NQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IExlZ2FsTGlua3M6IFJlYWN0LkZDPExlZ2FsTGlua3NQcm9wcz4gPSAoeyBvbkNsaWNrIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TGlua3NMaXN0IGFyaWEtbGFiZWw9XCJMZWdhbFwiIHJvbGU9XCJsaXN0XCI+XG4gICAgICB7dXJscy5tYXAoKFtjaGlsZHJlbiwgaHJlZiwgdGFyZ2V0XSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxMaW5rc0l0ZW0ga2V5PXtocmVmfT5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldCB9KX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvTGlua3NJdGVtPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9MaW5rc0xpc3Q+XG4gICk7XG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export var LegalLinks = function LegalLinks(_ref) {
  var _onClick = _ref.onClick;
  return /*#__PURE__*/_jsx(LinksList, {
    "aria-label": "Legal",
    role: "list",
    children: urls.map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
        children = _ref3[0],
        href = _ref3[1],
        target = _ref3[2];
      return /*#__PURE__*/_jsx(LinksItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: href,
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: target
            });
          },
          variant: "interface",
          children: children
        })
      }, href);
    })
  });
};