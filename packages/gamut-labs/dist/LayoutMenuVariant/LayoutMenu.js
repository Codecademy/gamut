function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box, Flyout, Logo, StrokeButton } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
import { AccordionMenu } from './AccordionMenu';
import { LayoutMenuSection } from './LayoutMenuSection';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyleBox = /*#__PURE__*/_styled(Box, {
  target: "e1w13jw20",
  label: "StyleBox"
})(variant({
  prop: 'menuHeight',
  base: {
    borderColor: 'black',
    borderStyleBottom: 'solid',
    borderWidthBottom: '1px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: '4px',
    paddingLeft: '4px'
  },
  variants: {
    sm: {
      height: '630px'
    },
    md: {
      height: '1000px'
    },
    lg: {
      height: '1370px'
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9MYXlvdXRNZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q2lCIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9MYXlvdXRNZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEJveCxcbiAgRmx5b3V0LFxuICBMb2dvLFxuICBTdHJva2VCdXR0b24sXG4gIFdpdGhDaGlsZHJlblByb3AsXG59IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHZhcmlhbnQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25NZW51LCBTZWN0aW9uLCBTZWN0aW9uSXRlbSB9IGZyb20gJy4vQWNjb3JkaW9uTWVudSc7XG5pbXBvcnQgeyBMYXlvdXRNZW51U2VjdGlvbiB9IGZyb20gJy4vTGF5b3V0TWVudVNlY3Rpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIExheW91dE1lbnVQcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICAvKipcbiAgICogQWNjZXNzaWJpbGl0eSBsYWJlbCBmb3IgdGhlIG1vYmlsZSBGbHlvdXQncyBjbG9zZSBidXR0b24uXG4gICAqL1xuICBjbG9zZUxhYmVsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBzZWN0aW9ucyBjb250YWluaW5nIHRoZSB0aXRsZSwgc2x1ZywgYW5kIGl0ZW1zLCBlYWNoIG9mIHdoaWNoIHdpbGwgYmVjb21lIGFuIGFjY29yZGlvbi4gRWFjaCBpdGVtIGNvbnRhaW5zIGEgdGl0bGUsIHNsdWcsIGFuZCBvbkNsaWNrLlxuICAgKi9cbiAgc2VjdGlvbnM6IFNlY3Rpb25bXTtcbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGJlIHJ1biBvbiBjbGljayBvZiB0aGUgYWNjb3JkaW9uIGJ1dHRvblxuICAgKi9cbiAgb25TZWN0aW9uVG9nZ2xlOiAoc2VjdGlvblNsdWc6IHN0cmluZykgPT4gdm9pZDtcbiAgLyoqXG4gICAqIFRleHQgc2hvd24gaW4gbW9iaWxlIGJ1dHRvbiB0aGF0IG9wZW5zIGZseW91dCBvbiBjbGlja1xuICAgKi9cbiAgbW9iaWxlQnV0dG9uVGV4dDogc3RyaW5nO1xuICAvKipcbiAgICogQnJlYWtwb2ludCBhYm92ZSB3aGljaCB0aGUgbWVudSBidXR0b24gZGlzcGxheXMgYXMgYSBmdWxsIHNpZGViYXJcbiAgICovXG4gIGJyZWFrcG9pbnQ/OiAneHMnIHwgJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJztcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIHNlY3Rpb24gaXRlbXMsIGVhY2ggb2Ygd2hpY2ggYmVjb21lIGFuIGFkZGl0aW9uYWwgbGluayBvbiB0b3Agb2YgdGhlIGFjY29yZGlvbiBzZWN0aW9uLlxuICAgKi9cbiAgdG9wTGlua1NlY3Rpb25zPzogU2VjdGlvbkl0ZW1bXTtcbiAgLyoqXG4gICAqIFNldCBmaXhlZCBoZWlnaHQgZm9yIG1lbnUgd2l0aCBvdmVyZmxvd1xuICAgKi9cbiAgbWVudUhlaWdodD86ICdzbScgfCAnbWQnIHwgJ2xnJztcbn1cblxuY29uc3QgU3R5bGVCb3ggPSBzdHlsZWQoQm94KShcbiAgdmFyaWFudCh7XG4gICAgcHJvcDogJ21lbnVIZWlnaHQnLFxuICAgIGJhc2U6IHtcbiAgICAgIGJvcmRlckNvbG9yOiAnYmxhY2snLFxuICAgICAgYm9yZGVyU3R5bGVCb3R0b206ICdzb2xpZCcsXG4gICAgICBib3JkZXJXaWR0aEJvdHRvbTogJzFweCcsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gICAgICBwYWRkaW5nVG9wOiAnNHB4JyxcbiAgICAgIHBhZGRpbmdMZWZ0OiAnNHB4JyxcbiAgICB9LFxuICAgIHZhcmlhbnRzOiB7XG4gICAgICBzbToge1xuICAgICAgICBoZWlnaHQ6ICc2MzBweCcsXG4gICAgICB9LFxuICAgICAgbWQ6IHtcbiAgICAgICAgaGVpZ2h0OiAnMTAwMHB4JyxcbiAgICAgIH0sXG4gICAgICBsZzoge1xuICAgICAgICBoZWlnaHQ6ICcxMzcwcHgnLFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IExheW91dE1lbnU6IFJlYWN0LkZDPExheW91dE1lbnVQcm9wcz4gPSAoe1xuICBjbG9zZUxhYmVsLFxuICBzZWN0aW9ucyxcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBtb2JpbGVCdXR0b25UZXh0LFxuICBicmVha3BvaW50ID0gJ2xnJyxcbiAgY2hpbGRyZW4sXG4gIHRvcExpbmtTZWN0aW9ucyxcbiAgbWVudUhlaWdodCxcbn0pID0+IHtcbiAgY29uc3QgW2V4cGFuZGVkLCBzZXRFeHBhbmRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgYWNjb3JkaW9uTWVudVNlY3Rpb25zID0gc2VjdGlvbnMubWFwKChzZWN0aW9uKSA9PiAoXG4gICAgPEFjY29yZGlvbk1lbnVcbiAgICAgIGtleT17c2VjdGlvbi5zbHVnfVxuICAgICAgc2VjdGlvbj17c2VjdGlvbn1cbiAgICAgIG9uU2VjdGlvblRvZ2dsZT17b25TZWN0aW9uVG9nZ2xlfVxuICAgICAgb25JdGVtQ2xpY2s9eygpID0+IHNldEV4cGFuZGVkKGZhbHNlKX1cbiAgICAvPlxuICApKTtcblxuICBjb25zdCB0b3BMaW5rTGF5b3V0TWVudVNlY3Rpb25zID0gdG9wTGlua1NlY3Rpb25zICYmIChcbiAgICA8TGF5b3V0TWVudVNlY3Rpb25cbiAgICAgIGl0ZW1zPXt0b3BMaW5rU2VjdGlvbnN9XG4gICAgICBvbkl0ZW1DbGljaz17KCkgPT4gc2V0RXhwYW5kZWQoZmFsc2UpfVxuICAgICAgcGI9ezMyfVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8bmF2PlxuICAgICAgPEJveCBkaXNwbGF5PXt7IF86ICdibG9jaycsIFticmVha3BvaW50XTogJ25vbmUnIH19PlxuICAgICAgICA8Rmx5b3V0XG4gICAgICAgICAgY2xvc2VMYWJlbD17Y2xvc2VMYWJlbH1cbiAgICAgICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0RXhwYW5kZWQoZmFsc2UpfVxuICAgICAgICAgIHRpdGxlPXs8TG9nbyBtYj17MzJ9IC8+fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveCBweD17MjR9PlxuICAgICAgICAgICAge3RvcExpbmtMYXlvdXRNZW51U2VjdGlvbnN9XG4gICAgICAgICAgICB7YWNjb3JkaW9uTWVudVNlY3Rpb25zfVxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0ZseW91dD5cbiAgICAgICAgPFN0cm9rZUJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEV4cGFuZGVkKHRydWUpfVxuICAgICAgICA+XG4gICAgICAgICAge21vYmlsZUJ1dHRvblRleHR9XG4gICAgICAgIDwvU3Ryb2tlQnV0dG9uPlxuICAgICAgPC9Cb3g+XG4gICAgICA8U3R5bGVCb3hcbiAgICAgICAgbWVudUhlaWdodD17bWVudUhlaWdodH1cbiAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIFticmVha3BvaW50XTogJ2Jsb2NrJyB9fVxuICAgICAgICBkYXRhLXRlc3RpZD1cImRlc2t0b3AtbWVudVwiXG4gICAgICA+XG4gICAgICAgIHt0b3BMaW5rTGF5b3V0TWVudVNlY3Rpb25zfVxuICAgICAgICB7YWNjb3JkaW9uTWVudVNlY3Rpb25zfVxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1N0eWxlQm94PlxuICAgIDwvbmF2PlxuICApO1xufTtcbiJdfQ== */");
export var LayoutMenu = function LayoutMenu(_ref) {
  var closeLabel = _ref.closeLabel,
    sections = _ref.sections,
    onSectionToggle = _ref.onSectionToggle,
    mobileButtonText = _ref.mobileButtonText,
    _ref$breakpoint = _ref.breakpoint,
    breakpoint = _ref$breakpoint === void 0 ? 'lg' : _ref$breakpoint,
    children = _ref.children,
    topLinkSections = _ref.topLinkSections,
    menuHeight = _ref.menuHeight;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  var accordionMenuSections = sections.map(function (section) {
    return /*#__PURE__*/_jsx(AccordionMenu, {
      section: section,
      onSectionToggle: onSectionToggle,
      onItemClick: function onItemClick() {
        return setExpanded(false);
      }
    }, section.slug);
  });
  var topLinkLayoutMenuSections = topLinkSections && /*#__PURE__*/_jsx(LayoutMenuSection, {
    items: topLinkSections,
    onItemClick: function onItemClick() {
      return setExpanded(false);
    },
    pb: 32
  });
  return /*#__PURE__*/_jsxs("nav", {
    children: [/*#__PURE__*/_jsxs(Box, {
      display: _defineProperty({
        _: 'block'
      }, breakpoint, 'none'),
      children: [/*#__PURE__*/_jsx(Flyout, {
        closeLabel: closeLabel,
        expanded: expanded,
        onClose: function onClose() {
          return setExpanded(false);
        },
        title: /*#__PURE__*/_jsx(Logo, {
          mb: 32
        }),
        children: /*#__PURE__*/_jsxs(Box, {
          px: 24,
          children: [topLinkLayoutMenuSections, accordionMenuSections, children]
        })
      }), /*#__PURE__*/_jsx(StrokeButton, {
        variant: "secondary",
        width: 1,
        onClick: function onClick() {
          return setExpanded(true);
        },
        children: mobileButtonText
      })]
    }), /*#__PURE__*/_jsxs(StyleBox, {
      menuHeight: menuHeight,
      display: _defineProperty({
        _: 'none'
      }, breakpoint, 'block'),
      "data-testid": "desktop-menu",
      children: [topLinkLayoutMenuSections, accordionMenuSections, children]
    })]
  });
};