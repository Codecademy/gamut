function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { CTAButton, FillButton } from '@codecademy/gamut';
import React from 'react';
export var CTA = function CTA(_ref) {
  var _ref$buttonType = _ref.buttonType,
      buttonType = _ref$buttonType === void 0 ? 'cta' : _ref$buttonType,
      buttonProps = _objectWithoutProperties(_ref, ["buttonType"]);

  return buttonType === 'fill' ? /*#__PURE__*/React.createElement(FillButton, buttonProps) : /*#__PURE__*/React.createElement(CTAButton, buttonProps);
};