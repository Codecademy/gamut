function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { colors } from '@codecademy/gamut-styles';
import React from 'react';
import { LogoProCutout } from '../LogoProCutout';
import { LogoProCutoutTransparent } from '../LogoProCutoutTransparent';
export var ProLogo = function ProLogo(props) {
  if (props.variant === 'cutout') {
    var _props$backgroundColo = props.backgroundColor,
        _backgroundColor = _props$backgroundColo === void 0 ? 'navy' : _props$backgroundColo,
        _props$cutoutColor = props.cutoutColor,
        cutoutColor = _props$cutoutColor === void 0 ? 'white' : _props$cutoutColor,
        _forwardedProps = _objectWithoutProperties(props, ["backgroundColor", "cutoutColor"]);

    return /*#__PURE__*/React.createElement(LogoProCutout, _extends({
      backgroundColor: colors[_backgroundColor],
      cutoutColor: colors[cutoutColor]
    }, _forwardedProps));
  }

  var _props$backgroundColo2 = props.backgroundColor,
      backgroundColor = _props$backgroundColo2 === void 0 ? 'white' : _props$backgroundColo2,
      forwardedProps = _objectWithoutProperties(props, ["backgroundColor"]);

  return /*#__PURE__*/React.createElement(LogoProCutoutTransparent, _extends({
    backgroundColor: colors[backgroundColor]
  }, forwardedProps));
};