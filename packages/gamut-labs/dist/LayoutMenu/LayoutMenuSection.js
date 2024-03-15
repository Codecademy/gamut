function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { Box } from '@codecademy/gamut';
import React from 'react';
import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';
export var LayoutMenuSection = function LayoutMenuSection(_ref) {
  var items = _ref.items,
      selectedItem = _ref.selectedItem,
      onItemClick = _ref.onItemClick,
      styleProps = _objectWithoutProperties(_ref, ["items", "selectedItem", "onItemClick"]);

  return /*#__PURE__*/React.createElement(Box, styleProps, items.map(function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item.slug,
      py: 8,
      px: 4
    }, selectedItem === item.slug ? /*#__PURE__*/React.createElement(SelectedSectionItem, null, item.title) : /*#__PURE__*/React.createElement(SectionItemLink, {
      href: item.href,
      onClick: function onClick(event) {
        item.onClick(event);
        onItemClick();
      }
    }, item.title));
  }));
};