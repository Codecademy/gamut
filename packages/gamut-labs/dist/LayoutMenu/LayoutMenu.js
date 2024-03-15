import _styled from "@emotion/styled/base";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Box, Flyout, Logo, StrokeButton } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
import { AccordionMenu } from './AccordionMenu';
import { LayoutMenuSection } from './LayoutMenuSection';

var StyleBox = /*#__PURE__*/_styled(Box, {
  target: "egzce460",
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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51L0xheW91dE1lbnUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJDaUIiLCJmaWxlIjoiLi4vLi4vc3JjL0xheW91dE1lbnUvTGF5b3V0TWVudS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEZseW91dCwgTG9nbywgU3Ryb2tlQnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEFjY29yZGlvbk1lbnUsIFNlY3Rpb24sIFNlY3Rpb25JdGVtIH0gZnJvbSAnLi9BY2NvcmRpb25NZW51JztcbmltcG9ydCB7IExheW91dE1lbnVTZWN0aW9uIH0gZnJvbSAnLi9MYXlvdXRNZW51U2VjdGlvbic7XG5cbmV4cG9ydCB0eXBlIExheW91dE1lbnVQcm9wcyA9IHtcbiAgLyoqXG4gICAqIEFjY2Vzc2liaWxpdHkgbGFiZWwgZm9yIHRoZSBtb2JpbGUgRmx5b3V0J3MgY2xvc2UgYnV0dG9uLlxuICAgKi9cbiAgY2xvc2VMYWJlbDogc3RyaW5nO1xuICAvKipcbiAgICogQW4gYXJyYXkgb2Ygc2VjdGlvbnMgY29udGFpbmluZyB0aGUgdGl0bGUsIHNsdWcsIGFuZCBpdGVtcywgZWFjaCBvZiB3aGljaCB3aWxsIGJlY29tZSBhbiBhY2NvcmRpb24uIEVhY2ggaXRlbSBjb250YWlucyBhIHRpdGxlLCBzbHVnLCBhbmQgb25DbGljay5cbiAgICovXG4gIHNlY3Rpb25zOiBTZWN0aW9uW107XG4gIC8qKlxuICAgKiBUaGUgc2x1ZyBvZiB0aGUgY3VycmVudCBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICBzZWxlY3RlZEl0ZW0/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBiZSBydW4gb24gY2xpY2sgb2YgdGhlIGFjY29yZGlvbiBidXR0b25cbiAgICovXG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb25TbHVnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBUZXh0IHNob3duIGluIG1vYmlsZSBidXR0b24gdGhhdCBvcGVucyBmbHlvdXQgb24gY2xpY2tcbiAgICovXG4gIG1vYmlsZUJ1dHRvblRleHQ6IHN0cmluZztcbiAgLyoqXG4gICAqIEJyZWFrcG9pbnQgYWJvdmUgd2hpY2ggdGhlIG1lbnUgYnV0dG9uIGRpc3BsYXlzIGFzIGEgZnVsbCBzaWRlYmFyXG4gICAqL1xuICBicmVha3BvaW50PzogJ3hzJyB8ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCc7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBzZWN0aW9uIGl0ZW1zLCBlYWNoIG9mIHdoaWNoIGJlY29tZSBhbiBhZGRpdGlvbmFsIGxpbmsgb24gdG9wIG9mIHRoZSBhY2NvcmRpb24gc2VjdGlvbi5cbiAgICovXG4gIHRvcExpbmtTZWN0aW9ucz86IFNlY3Rpb25JdGVtW107XG4gIC8qKlxuICAgKiBTZXQgZml4ZWQgaGVpZ2h0IGZvciBtZW51IHdpdGggb3ZlcmZsb3dcbiAgICovXG4gIG1lbnVIZWlnaHQ/OiAnc20nIHwgJ21kJyB8ICdsZyc7XG59O1xuXG5jb25zdCBTdHlsZUJveCA9IHN0eWxlZChCb3gpKFxuICB2YXJpYW50KHtcbiAgICBwcm9wOiAnbWVudUhlaWdodCcsXG4gICAgYmFzZToge1xuICAgICAgYm9yZGVyQ29sb3I6ICdibGFjaycsXG4gICAgICBib3JkZXJTdHlsZUJvdHRvbTogJ3NvbGlkJyxcbiAgICAgIGJvcmRlcldpZHRoQm90dG9tOiAnMXB4JyxcbiAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgIHBhZGRpbmdUb3A6ICc0cHgnLFxuICAgICAgcGFkZGluZ0xlZnQ6ICc0cHgnLFxuICAgIH0sXG4gICAgdmFyaWFudHM6IHtcbiAgICAgIHNtOiB7XG4gICAgICAgIGhlaWdodDogJzYzMHB4JyxcbiAgICAgIH0sXG4gICAgICBtZDoge1xuICAgICAgICBoZWlnaHQ6ICcxMDAwcHgnLFxuICAgICAgfSxcbiAgICAgIGxnOiB7XG4gICAgICAgIGhlaWdodDogJzEzNzBweCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgTGF5b3V0TWVudTogUmVhY3QuRkM8TGF5b3V0TWVudVByb3BzPiA9ICh7XG4gIGNsb3NlTGFiZWwsXG4gIHNlY3Rpb25zLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIHNlbGVjdGVkSXRlbSxcbiAgbW9iaWxlQnV0dG9uVGV4dCxcbiAgYnJlYWtwb2ludCA9ICdsZycsXG4gIGNoaWxkcmVuLFxuICB0b3BMaW5rU2VjdGlvbnMsXG4gIG1lbnVIZWlnaHQsXG59KSA9PiB7XG4gIGNvbnN0IFtleHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGFjY29yZGlvbk1lbnVTZWN0aW9ucyA9IHNlY3Rpb25zLm1hcCgoc2VjdGlvbikgPT4gKFxuICAgIDxBY2NvcmRpb25NZW51XG4gICAgICBrZXk9e3NlY3Rpb24uc2x1Z31cbiAgICAgIHNlY3Rpb249e3NlY3Rpb259XG4gICAgICBvblNlY3Rpb25Ub2dnbGU9e29uU2VjdGlvblRvZ2dsZX1cbiAgICAgIG9uSXRlbUNsaWNrPXsoKSA9PiBzZXRFeHBhbmRlZChmYWxzZSl9XG4gICAgICBzZWxlY3RlZEl0ZW09e3NlbGVjdGVkSXRlbX1cbiAgICAvPlxuICApKTtcblxuICBjb25zdCB0b3BMaW5rTGF5b3V0TWVudVNlY3Rpb25zID0gdG9wTGlua1NlY3Rpb25zICYmIChcbiAgICA8TGF5b3V0TWVudVNlY3Rpb25cbiAgICAgIGl0ZW1zPXt0b3BMaW5rU2VjdGlvbnN9XG4gICAgICBvbkl0ZW1DbGljaz17KCkgPT4gc2V0RXhwYW5kZWQoZmFsc2UpfVxuICAgICAgc2VsZWN0ZWRJdGVtPXtzZWxlY3RlZEl0ZW19XG4gICAgICBwYj17MzJ9XG4gICAgLz5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxuYXY+XG4gICAgICA8Qm94IGRpc3BsYXk9e3sgXzogJ2Jsb2NrJywgW2JyZWFrcG9pbnRdOiAnbm9uZScgfX0+XG4gICAgICAgIDxGbHlvdXRcbiAgICAgICAgICBjbG9zZUxhYmVsPXtjbG9zZUxhYmVsfVxuICAgICAgICAgIGV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRFeHBhbmRlZChmYWxzZSl9XG4gICAgICAgICAgdGl0bGU9ezxMb2dvIG1iPXszMn0gLz59XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IHB4PXsxNn0+XG4gICAgICAgICAgICB7dG9wTGlua0xheW91dE1lbnVTZWN0aW9uc31cbiAgICAgICAgICAgIHthY2NvcmRpb25NZW51U2VjdGlvbnN9XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRmx5b3V0PlxuICAgICAgICA8U3Ryb2tlQnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RXhwYW5kZWQodHJ1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICB7bW9iaWxlQnV0dG9uVGV4dH1cbiAgICAgICAgPC9TdHJva2VCdXR0b24+XG4gICAgICA8L0JveD5cbiAgICAgIDxTdHlsZUJveFxuICAgICAgICBtZW51SGVpZ2h0PXttZW51SGVpZ2h0fVxuICAgICAgICBkaXNwbGF5PXt7IF86ICdub25lJywgW2JyZWFrcG9pbnRdOiAnYmxvY2snIH19XG4gICAgICAgIGRhdGEtdGVzdGlkPVwiZGVza3RvcC1tZW51XCJcbiAgICAgID5cbiAgICAgICAge3RvcExpbmtMYXlvdXRNZW51U2VjdGlvbnN9XG4gICAgICAgIHthY2NvcmRpb25NZW51U2VjdGlvbnN9XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvU3R5bGVCb3g+XG4gICAgPC9uYXY+XG4gICk7XG59O1xuIl19 */");

export var LayoutMenu = function LayoutMenu(_ref) {
  var closeLabel = _ref.closeLabel,
      sections = _ref.sections,
      onSectionToggle = _ref.onSectionToggle,
      selectedItem = _ref.selectedItem,
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
    return /*#__PURE__*/React.createElement(AccordionMenu, {
      key: section.slug,
      section: section,
      onSectionToggle: onSectionToggle,
      onItemClick: function onItemClick() {
        return setExpanded(false);
      },
      selectedItem: selectedItem
    });
  });
  var topLinkLayoutMenuSections = topLinkSections && /*#__PURE__*/React.createElement(LayoutMenuSection, {
    items: topLinkSections,
    onItemClick: function onItemClick() {
      return setExpanded(false);
    },
    selectedItem: selectedItem,
    pb: 32
  });
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement(Box, {
    display: _defineProperty({
      _: 'block'
    }, breakpoint, 'none')
  }, /*#__PURE__*/React.createElement(Flyout, {
    closeLabel: closeLabel,
    expanded: expanded,
    onClose: function onClose() {
      return setExpanded(false);
    },
    title: /*#__PURE__*/React.createElement(Logo, {
      mb: 32
    })
  }, /*#__PURE__*/React.createElement(Box, {
    px: 16
  }, topLinkLayoutMenuSections, accordionMenuSections, children)), /*#__PURE__*/React.createElement(StrokeButton, {
    variant: "secondary",
    width: 1,
    onClick: function onClick() {
      return setExpanded(true);
    }
  }, mobileButtonText)), /*#__PURE__*/React.createElement(StyleBox, {
    menuHeight: menuHeight,
    display: _defineProperty({
      _: 'none'
    }, breakpoint, 'block'),
    "data-testid": "desktop-menu"
  }, topLinkLayoutMenuSections, accordionMenuSections, children));
};