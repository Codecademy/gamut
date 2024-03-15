function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { CodecademyLogo } from './CodecademyLogo';
import { CodecademyPremiumLogo } from './CodecademyPremiumLogo';
import { CodecademyProAltLogo } from './CodecademyProAltLogo';
import { CodecademyProgramLogo } from './CodecademyProgramLogo';
import { CodecademyProLockupLogo } from './CodecademyProLockupLogo';
import { CodecademyProLogo } from './CodecademyProLogo';
import { CodecademyProMonoLogo } from './CodecademyProMonoLogo';
var defaultProps = {
  height: 32,
  type: 'default'
};
var logos = {
  pro: CodecademyProLogo,
  proAlt: CodecademyProAltLogo,
  proLockup: CodecademyProLockupLogo,
  proMono: CodecademyProMonoLogo,
  program: CodecademyProgramLogo,
  premium: CodecademyPremiumLogo,
  "default": CodecademyLogo
};
export function Logo(_ref) {
  var type = _ref.type,
      props = _objectWithoutProperties(_ref, ["type"]);

  var LogoTag = logos[type] || CodecademyLogo;
  return /*#__PURE__*/React.createElement(LogoTag, props);
}
Logo.defaultProps = defaultProps;