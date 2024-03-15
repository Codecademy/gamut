import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { AccordionArea, Anchor, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';
import { system, transitionConcat } from '../../../gamut-styles/dist';
import { LayoutMenuSection } from './LayoutMenuSection';

var StyledAccordionArea = /*#__PURE__*/_styled(AccordionArea, {
  target: "eaprxym1",
  label: "StyledAccordionArea"
})("padding-bottom:", function (_ref) {
  var theme = _ref.theme;
  return theme.spacing[32];
}, ";position:relative;left:-4px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51L0FjY29yZGlvbk1lbnUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFpRCIsImZpbGUiOiIuLi8uLi9zcmMvTGF5b3V0TWVudS9BY2NvcmRpb25NZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY29yZGlvbkFyZWEsIEFuY2hvciwgVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IE1pbmlDaGV2cm9uRG93bkljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHN5c3RlbSwgdHJhbnNpdGlvbkNvbmNhdCB9IGZyb20gJy4uLy4uLy4uL2dhbXV0LXN0eWxlcy9kaXN0JztcbmltcG9ydCB7IExheW91dE1lbnVTZWN0aW9uIH0gZnJvbSAnLi9MYXlvdXRNZW51U2VjdGlvbic7XG5cbmNvbnN0IFN0eWxlZEFjY29yZGlvbkFyZWEgPSBzdHlsZWQoQWNjb3JkaW9uQXJlYSlgXG4gIHBhZGRpbmctYm90dG9tOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnNwYWNpbmdbMzJdfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNHB4O1xuYDtcblxuY29uc3QgRXhwYW5kQ2hldnJvbiA9IHN0eWxlZChNaW5pQ2hldnJvbkRvd25JY29uKShcbiAgc3lzdGVtLmNzcyh7XG4gICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uQ29uY2F0KFsndHJhbnNmb3JtJ10sICdzbG93JywgJ2Vhc2Utb3V0JyksXG4gIH0pLFxuICBzeXN0ZW0uc3RhdGVzKHtcbiAgICBleHBhbmRlZDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMTgwZGVnKScgfSxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIFNlY3Rpb25JdGVtID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIGhyZWY6IHN0cmluZztcbiAgb25DbGljazogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbiA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBpdGVtczogU2VjdGlvbkl0ZW1bXTtcbn07XG5cbmV4cG9ydCB0eXBlIEFjY29yZGlvbk1lbnVQcm9wcyA9IHtcbiAgc2VjdGlvbjogU2VjdGlvbjtcbiAgb25TZWN0aW9uVG9nZ2xlOiAoc2VjdGlvblNsdWc6IHN0cmluZykgPT4gdm9pZDtcbiAgb25JdGVtQ2xpY2s6ICgpID0+IHZvaWQ7XG4gIHNlbGVjdGVkSXRlbT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvcmRpb25NZW51OiBSZWFjdC5GQzxBY2NvcmRpb25NZW51UHJvcHM+ID0gKHtcbiAgc2VjdGlvbixcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbkl0ZW1DbGljayxcbiAgc2VsZWN0ZWRJdGVtLFxufSkgPT4ge1xuICBjb25zdCBbZXhwYW5kZWQsIHNldEV4cGFuZGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFjY29yZGlvbkFyZWFcbiAgICAgIGV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgIHRvcD17XG4gICAgICAgIDxBbmNob3JcbiAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICBweT17MTJ9XG4gICAgICAgICAgcHg9ezR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlKHNlY3Rpb24uc2x1Zyk7XG4gICAgICAgICAgICBzZXRFeHBhbmRlZCgocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICA+XG4gICAgICAgICAgPFRleHQgdmFyaWFudD1cInRpdGxlLXhzXCIgc3R5bGU9e3sgZmxleDogMSB9fSB0ZXh0QWxpZ249XCJsZWZ0XCI+XG4gICAgICAgICAgICB7c2VjdGlvbi50aXRsZX1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPEV4cGFuZENoZXZyb25cbiAgICAgICAgICAgIG1sPXsxMn1cbiAgICAgICAgICAgIHNpemU9ezE0fVxuICAgICAgICAgICAgZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgICAgICAgICB0b3A9ezR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9BbmNob3I+XG4gICAgICB9XG4gICAgPlxuICAgICAgPExheW91dE1lbnVTZWN0aW9uXG4gICAgICAgIGl0ZW1zPXtzZWN0aW9uLml0ZW1zfVxuICAgICAgICBzZWxlY3RlZEl0ZW09e3NlbGVjdGVkSXRlbX1cbiAgICAgICAgb25JdGVtQ2xpY2s9e29uSXRlbUNsaWNrfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZEFjY29yZGlvbkFyZWE+XG4gICk7XG59O1xuIl19 */"));

var ExpandChevron = /*#__PURE__*/_styled(MiniChevronDownIcon, {
  target: "eaprxym0",
  label: "ExpandChevron"
})(system.css({
  transform: 'rotate(0deg)',
  transition: transitionConcat(['transform'], 'slow', 'ease-out')
}), system.states({
  expanded: {
    transform: 'rotate(180deg)'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51L0FjY29yZGlvbk1lbnUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNzQiIsImZpbGUiOiIuLi8uLi9zcmMvTGF5b3V0TWVudS9BY2NvcmRpb25NZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY29yZGlvbkFyZWEsIEFuY2hvciwgVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IE1pbmlDaGV2cm9uRG93bkljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHN5c3RlbSwgdHJhbnNpdGlvbkNvbmNhdCB9IGZyb20gJy4uLy4uLy4uL2dhbXV0LXN0eWxlcy9kaXN0JztcbmltcG9ydCB7IExheW91dE1lbnVTZWN0aW9uIH0gZnJvbSAnLi9MYXlvdXRNZW51U2VjdGlvbic7XG5cbmNvbnN0IFN0eWxlZEFjY29yZGlvbkFyZWEgPSBzdHlsZWQoQWNjb3JkaW9uQXJlYSlgXG4gIHBhZGRpbmctYm90dG9tOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnNwYWNpbmdbMzJdfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNHB4O1xuYDtcblxuY29uc3QgRXhwYW5kQ2hldnJvbiA9IHN0eWxlZChNaW5pQ2hldnJvbkRvd25JY29uKShcbiAgc3lzdGVtLmNzcyh7XG4gICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uQ29uY2F0KFsndHJhbnNmb3JtJ10sICdzbG93JywgJ2Vhc2Utb3V0JyksXG4gIH0pLFxuICBzeXN0ZW0uc3RhdGVzKHtcbiAgICBleHBhbmRlZDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMTgwZGVnKScgfSxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIFNlY3Rpb25JdGVtID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIGhyZWY6IHN0cmluZztcbiAgb25DbGljazogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbiA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBpdGVtczogU2VjdGlvbkl0ZW1bXTtcbn07XG5cbmV4cG9ydCB0eXBlIEFjY29yZGlvbk1lbnVQcm9wcyA9IHtcbiAgc2VjdGlvbjogU2VjdGlvbjtcbiAgb25TZWN0aW9uVG9nZ2xlOiAoc2VjdGlvblNsdWc6IHN0cmluZykgPT4gdm9pZDtcbiAgb25JdGVtQ2xpY2s6ICgpID0+IHZvaWQ7XG4gIHNlbGVjdGVkSXRlbT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvcmRpb25NZW51OiBSZWFjdC5GQzxBY2NvcmRpb25NZW51UHJvcHM+ID0gKHtcbiAgc2VjdGlvbixcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbkl0ZW1DbGljayxcbiAgc2VsZWN0ZWRJdGVtLFxufSkgPT4ge1xuICBjb25zdCBbZXhwYW5kZWQsIHNldEV4cGFuZGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFjY29yZGlvbkFyZWFcbiAgICAgIGV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgIHRvcD17XG4gICAgICAgIDxBbmNob3JcbiAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICBweT17MTJ9XG4gICAgICAgICAgcHg9ezR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlKHNlY3Rpb24uc2x1Zyk7XG4gICAgICAgICAgICBzZXRFeHBhbmRlZCgocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICA+XG4gICAgICAgICAgPFRleHQgdmFyaWFudD1cInRpdGxlLXhzXCIgc3R5bGU9e3sgZmxleDogMSB9fSB0ZXh0QWxpZ249XCJsZWZ0XCI+XG4gICAgICAgICAgICB7c2VjdGlvbi50aXRsZX1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPEV4cGFuZENoZXZyb25cbiAgICAgICAgICAgIG1sPXsxMn1cbiAgICAgICAgICAgIHNpemU9ezE0fVxuICAgICAgICAgICAgZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgICAgICAgICB0b3A9ezR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9BbmNob3I+XG4gICAgICB9XG4gICAgPlxuICAgICAgPExheW91dE1lbnVTZWN0aW9uXG4gICAgICAgIGl0ZW1zPXtzZWN0aW9uLml0ZW1zfVxuICAgICAgICBzZWxlY3RlZEl0ZW09e3NlbGVjdGVkSXRlbX1cbiAgICAgICAgb25JdGVtQ2xpY2s9e29uSXRlbUNsaWNrfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZEFjY29yZGlvbkFyZWE+XG4gICk7XG59O1xuIl19 */");

export var AccordionMenu = function AccordionMenu(_ref2) {
  var section = _ref2.section,
      onSectionToggle = _ref2.onSectionToggle,
      onItemClick = _ref2.onItemClick,
      selectedItem = _ref2.selectedItem;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  return /*#__PURE__*/React.createElement(StyledAccordionArea, {
    expanded: expanded,
    top: /*#__PURE__*/React.createElement(Anchor, {
      variant: "interface",
      py: 12,
      px: 4,
      onClick: function onClick() {
        onSectionToggle(section.slug);
        setExpanded(function (prev) {
          return !prev;
        });
      },
      "aria-expanded": expanded,
      display: "flex"
    }, /*#__PURE__*/React.createElement(Text, {
      variant: "title-xs",
      style: {
        flex: 1
      },
      textAlign: "left"
    }, section.title), /*#__PURE__*/React.createElement(ExpandChevron, {
      ml: 12,
      size: 14,
      expanded: expanded,
      position: "relative",
      top: 4
    }))
  }, /*#__PURE__*/React.createElement(LayoutMenuSection, {
    items: section.items,
    selectedItem: selectedItem,
    onItemClick: onItemClick
  }));
};