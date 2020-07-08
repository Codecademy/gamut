function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '@codecademy/gamut';
export var Avatar = function Avatar(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? VisualTheme.LightMode : _ref$theme,
      className = _ref.className,
      avatarImageProps = _objectWithoutProperties(_ref, ["theme", "className"]);

  return React.createElement("div", {
    className: cx(s.container, className, theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer)
  }, React.createElement("img", avatarImageProps));
};
export default Avatar;