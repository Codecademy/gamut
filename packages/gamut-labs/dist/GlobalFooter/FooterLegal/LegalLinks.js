import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { Anchor } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import React from 'react';
var urls = [['Privacy Policy', '/policy', 'policy'], ['Cookie Policy', '/cookie-policy', 'cookie_policy'], ['Do Not Sell My Personal Information', 'https://privacy.codecademy.com', 'data_privacy'], ['Terms', '/terms', 'terms']];

var LinksList = _styled("ul", {
  target: "ez6q0cs1",
  label: "LinksList"
})("align-items:center;display:flex;flex-wrap:wrap;justify-content:center;list-style-type:none;margin-bottom:0.5rem;padding-left:0;", theme.breakpoints.md, "{justify-content:flex-start;display:inline-flex;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTGVnYWxMaW5rcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0IyQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL0xlZ2FsTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCB1cmxzID0gW1xuICBbJ1ByaXZhY3kgUG9saWN5JywgJy9wb2xpY3knLCAncG9saWN5J10sXG4gIFsnQ29va2llIFBvbGljeScsICcvY29va2llLXBvbGljeScsICdjb29raWVfcG9saWN5J10sXG4gIFtcbiAgICAnRG8gTm90IFNlbGwgTXkgUGVyc29uYWwgSW5mb3JtYXRpb24nLFxuICAgICdodHRwczovL3ByaXZhY3kuY29kZWNhZGVteS5jb20nLFxuICAgICdkYXRhX3ByaXZhY3knLFxuICBdLFxuICBbJ1Rlcm1zJywgJy90ZXJtcycsICd0ZXJtcyddLFxuXTtcblxuY29uc3QgTGlua3NMaXN0ID0gc3R5bGVkLnVsYFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIH1cbmA7XG5cbmNvbnN0IExpbmtzSXRlbSA9IHN0eWxlZC5saWBcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICd8JztcbiAgICBtYXJnaW46IDAgMC4zNzVyZW07XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICB9XG5cbiAgJjpsYXN0LW9mLXR5cGU6OmFmdGVyIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5gO1xuXG5leHBvcnQgdHlwZSBMZWdhbExpbmtzUHJvcHMgPSB7XG4gIG9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBMZWdhbExpbmtzOiBSZWFjdC5GQzxMZWdhbExpbmtzUHJvcHM+ID0gKHsgb25DbGljayB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPExpbmtzTGlzdCBhcmlhLWxhYmVsPVwiTGVnYWxcIiByb2xlPVwibGlzdFwiPlxuICAgICAge3VybHMubWFwKChbY2hpbGRyZW4sIGhyZWYsIHRhcmdldF0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TGlua3NJdGVtIGtleT17aHJlZn0+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0xpbmtzSXRlbT5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvTGlua3NMaXN0PlxuICApO1xufTtcbiJdfQ== */"));

var LinksItem = _styled("li", {
  target: "ez6q0cs0",
  label: "LinksItem"
})(process.env.NODE_ENV === "production" ? {
  name: "1idsucm",
  styles: "&::after{content:'|';margin:0 0.375rem;font-size:1rem;}&:last-of-type::after{opacity:0;}"
} : {
  name: "1idsucm",
  styles: "&::after{content:'|';margin:0 0.375rem;font-size:1rem;}&:last-of-type::after{opacity:0;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTGVnYWxMaW5rcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUMyQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL0xlZ2FsTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCB1cmxzID0gW1xuICBbJ1ByaXZhY3kgUG9saWN5JywgJy9wb2xpY3knLCAncG9saWN5J10sXG4gIFsnQ29va2llIFBvbGljeScsICcvY29va2llLXBvbGljeScsICdjb29raWVfcG9saWN5J10sXG4gIFtcbiAgICAnRG8gTm90IFNlbGwgTXkgUGVyc29uYWwgSW5mb3JtYXRpb24nLFxuICAgICdodHRwczovL3ByaXZhY3kuY29kZWNhZGVteS5jb20nLFxuICAgICdkYXRhX3ByaXZhY3knLFxuICBdLFxuICBbJ1Rlcm1zJywgJy90ZXJtcycsICd0ZXJtcyddLFxuXTtcblxuY29uc3QgTGlua3NMaXN0ID0gc3R5bGVkLnVsYFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIH1cbmA7XG5cbmNvbnN0IExpbmtzSXRlbSA9IHN0eWxlZC5saWBcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICd8JztcbiAgICBtYXJnaW46IDAgMC4zNzVyZW07XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICB9XG5cbiAgJjpsYXN0LW9mLXR5cGU6OmFmdGVyIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5gO1xuXG5leHBvcnQgdHlwZSBMZWdhbExpbmtzUHJvcHMgPSB7XG4gIG9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBMZWdhbExpbmtzOiBSZWFjdC5GQzxMZWdhbExpbmtzUHJvcHM+ID0gKHsgb25DbGljayB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPExpbmtzTGlzdCBhcmlhLWxhYmVsPVwiTGVnYWxcIiByb2xlPVwibGlzdFwiPlxuICAgICAge3VybHMubWFwKChbY2hpbGRyZW4sIGhyZWYsIHRhcmdldF0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TGlua3NJdGVtIGtleT17aHJlZn0+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0xpbmtzSXRlbT5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvTGlua3NMaXN0PlxuICApO1xufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

export var LegalLinks = function LegalLinks(_ref) {
  var _onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement(LinksList, {
    "aria-label": "Legal",
    role: "list"
  }, urls.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 3),
        children = _ref3[0],
        href = _ref3[1],
        target = _ref3[2];

    return /*#__PURE__*/React.createElement(LinksItem, {
      key: href
    }, /*#__PURE__*/React.createElement(Anchor, {
      href: href,
      onClick: function onClick(event) {
        return _onClick({
          event: event,
          target: target
        });
      },
      variant: "interface"
    }, children));
  }));
};