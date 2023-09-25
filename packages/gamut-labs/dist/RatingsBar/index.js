import _styled from "@emotion/styled/base";
import { pxRem, theme } from '@codecademy/gamut-styles';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
var RatingsBarWrapper = /*#__PURE__*/_styled("div", {
  target: "e17x5n1p1",
  label: "RatingsBarWrapper"
})("border-width:", pxRem(1), ";border-style:solid;border-radius:", pxRem(80), ";background-color:", theme.colors.white, ";height:", pxRem(8), ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SYXRpbmdzQmFyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQm9DIiwiZmlsZSI6Ii4uLy4uL3NyYy9SYXRpbmdzQmFyL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB4UmVtLCB0aGVtZSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCB0eXBlIFJhdGluZ3NCYXJQcm9wcyA9IHtcbiAgLyoqXG4gICAqIE1pbmltdW0gYW1vdW50IG9mIHRoZSBiYXIgdG8gZmlsbCBpbiB2aXN1YWxseS5cbiAgICovXG4gIG1pbmltdW1QZXJjZW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBIb3cgbXVjaCBvZiB0aGUgYmFyIHRvIGZpbGwgaW4sIGFzIGEgbnVtYmVyIGluIFswLCAxMDBdLlxuICAgKi9cbiAgcGVyY2VudDogbnVtYmVyO1xufTtcblxuY29uc3QgUmF0aW5nc0JhcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItd2lkdGg6ICR7cHhSZW0oMSl9O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItcmFkaXVzOiAke3B4UmVtKDgwKX07XG4gIGJhY2tncm91bmQtY29sb3I6ICR7dGhlbWUuY29sb3JzLndoaXRlfTtcbiAgaGVpZ2h0OiAke3B4UmVtKDgpfTtcbmA7XG5cbmNvbnN0IEJhciA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmNvbG9ycy55ZWxsb3d9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFJhdGluZ3NCYXI6IFJlYWN0LkZDPFJhdGluZ3NCYXJQcm9wcz4gPSAoe1xuICBtaW5pbXVtUGVyY2VudCA9IDAsXG4gIHBlcmNlbnQsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFJhdGluZ3NCYXJXcmFwcGVyXG4gICAgICByb2xlPVwibWV0ZXJcIlxuICAgICAgYXJpYS12YWx1ZW5vdz17cGVyY2VudH1cbiAgICAgIGFyaWEtdmFsdWVtaW49ezB9XG4gICAgICBhcmlhLXZhbHVlbWF4PXsxMDB9XG4gICAgICBhcmlhLWxhYmVsPVwicmF0aW5ncyBiYXJcIlxuICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICA+XG4gICAgICA8QmFyXG4gICAgICAgIGRhdGEtdGVzdGlkPVwicmF0aW5ncy1iYXItYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7TWF0aC5tYXgobWluaW11bVBlcmNlbnQsIHBlcmNlbnQpfSVgLFxuICAgICAgICAgIGJveFNoYWRvdzogcGVyY2VudCA+IDAgPyBgJHtweFJlbSgwLjUpfSAwIDAgJHtweFJlbSgwLjUpfWAgOiAnbm9uZScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvUmF0aW5nc0JhcldyYXBwZXI+XG4gICk7XG59O1xuIl19 */"));
var Bar = /*#__PURE__*/_styled("div", {
  target: "e17x5n1p0",
  label: "Bar"
})("align-items:center;height:100%;display:flex;position:relative;border-radius:inherit;background-color:", theme.colors.yellow, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SYXRpbmdzQmFyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QnNCIiwiZmlsZSI6Ii4uLy4uL3NyYy9SYXRpbmdzQmFyL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB4UmVtLCB0aGVtZSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCB0eXBlIFJhdGluZ3NCYXJQcm9wcyA9IHtcbiAgLyoqXG4gICAqIE1pbmltdW0gYW1vdW50IG9mIHRoZSBiYXIgdG8gZmlsbCBpbiB2aXN1YWxseS5cbiAgICovXG4gIG1pbmltdW1QZXJjZW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBIb3cgbXVjaCBvZiB0aGUgYmFyIHRvIGZpbGwgaW4sIGFzIGEgbnVtYmVyIGluIFswLCAxMDBdLlxuICAgKi9cbiAgcGVyY2VudDogbnVtYmVyO1xufTtcblxuY29uc3QgUmF0aW5nc0JhcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItd2lkdGg6ICR7cHhSZW0oMSl9O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItcmFkaXVzOiAke3B4UmVtKDgwKX07XG4gIGJhY2tncm91bmQtY29sb3I6ICR7dGhlbWUuY29sb3JzLndoaXRlfTtcbiAgaGVpZ2h0OiAke3B4UmVtKDgpfTtcbmA7XG5cbmNvbnN0IEJhciA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmNvbG9ycy55ZWxsb3d9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFJhdGluZ3NCYXI6IFJlYWN0LkZDPFJhdGluZ3NCYXJQcm9wcz4gPSAoe1xuICBtaW5pbXVtUGVyY2VudCA9IDAsXG4gIHBlcmNlbnQsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFJhdGluZ3NCYXJXcmFwcGVyXG4gICAgICByb2xlPVwibWV0ZXJcIlxuICAgICAgYXJpYS12YWx1ZW5vdz17cGVyY2VudH1cbiAgICAgIGFyaWEtdmFsdWVtaW49ezB9XG4gICAgICBhcmlhLXZhbHVlbWF4PXsxMDB9XG4gICAgICBhcmlhLWxhYmVsPVwicmF0aW5ncyBiYXJcIlxuICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICA+XG4gICAgICA8QmFyXG4gICAgICAgIGRhdGEtdGVzdGlkPVwicmF0aW5ncy1iYXItYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7TWF0aC5tYXgobWluaW11bVBlcmNlbnQsIHBlcmNlbnQpfSVgLFxuICAgICAgICAgIGJveFNoYWRvdzogcGVyY2VudCA+IDAgPyBgJHtweFJlbSgwLjUpfSAwIDAgJHtweFJlbSgwLjUpfWAgOiAnbm9uZScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvUmF0aW5nc0JhcldyYXBwZXI+XG4gICk7XG59O1xuIl19 */"));
export var RatingsBar = function RatingsBar(_ref) {
  var _ref$minimumPercent = _ref.minimumPercent,
    minimumPercent = _ref$minimumPercent === void 0 ? 0 : _ref$minimumPercent,
    percent = _ref.percent;
  return /*#__PURE__*/_jsx(RatingsBarWrapper, {
    role: "meter",
    "aria-valuenow": percent,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-label": "ratings bar",
    "aria-live": "polite",
    children: /*#__PURE__*/_jsx(Bar, {
      "data-testid": "ratings-bar-bar",
      style: {
        width: "".concat(Math.max(minimumPercent, percent), "%"),
        boxShadow: percent > 0 ? "".concat(pxRem(0.5), " 0 0 ").concat(pxRem(0.5)) : 'none'
      }
    })
  });
};