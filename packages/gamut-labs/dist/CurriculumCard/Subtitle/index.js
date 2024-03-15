import { FlexBox, Text } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import React from 'react';
import { Difficulty } from '../Difficulty';
import { pluralizeWithS } from './helpers';
export var Subtitle = function Subtitle(_ref) {
  var difficulty = _ref.difficulty,
      scope = _ref.scope,
      _ref$showAltSubtitle = _ref.showAltSubtitle,
      showAltSubtitle = _ref$showAltSubtitle === void 0 ? false : _ref$showAltSubtitle,
      difficultyVariant = _ref.difficultyVariant;
  var scopeToMap = Object.keys(scope).filter(function (val) {
    return scope[val] > 0;
  });
  var separatingChar = showAltSubtitle ? '|' : ',';
  return /*#__PURE__*/React.createElement(React.Fragment, null, !showAltSubtitle && /*#__PURE__*/React.createElement(FlexBox, {
    fontSize: 14,
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Difficulty, {
    variant: difficultyVariant,
    difficulty: difficulty
  }), scopeToMap.length ? separatingChar : null), scopeToMap.map(function (scopeType, index) {
    return /*#__PURE__*/React.createElement(Text, {
      ml: showAltSubtitle && index === 0 ? 0 : 4,
      variant: "p-small",
      key: "".concat(scopeType, "-count")
    }, /*#__PURE__*/React.createElement("b", null, scope[scopeType]), ' ', /*#__PURE__*/React.createElement(Text, {
      textColor: "gray-900"
    }, capitalize(pluralizeWithS(scopeType, scope[scopeType]))), ' ', index < scopeToMap.length - 1 && separatingChar, ' ');
  }));
};