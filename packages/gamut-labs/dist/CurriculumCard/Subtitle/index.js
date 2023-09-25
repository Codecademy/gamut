import { FlexBox, Text } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import * as React from 'react';
import { Difficulty } from '../Difficulty';
import { pluralizeWithS } from './helpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
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
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!showAltSubtitle && /*#__PURE__*/_jsxs(FlexBox, {
      fontSize: 14,
      alignItems: "center",
      children: [/*#__PURE__*/_jsx(Difficulty, {
        variant: difficultyVariant,
        difficulty: difficulty
      }), scopeToMap.length ? separatingChar : null]
    }), scopeToMap.map(function (scopeType, index) {
      return /*#__PURE__*/_jsxs(Text, {
        ml: showAltSubtitle && index === 0 ? 0 : 4,
        variant: "p-small",
        children: [/*#__PURE__*/_jsx("b", {
          children: scope[scopeType]
        }), ' ', /*#__PURE__*/_jsx(Text, {
          textColor: "gray-900",
          children: capitalize(pluralizeWithS(scopeType, scope[scopeType]))
        }), ' ', index < scopeToMap.length - 1 && separatingChar, ' ']
      }, "".concat(scopeType, "-count"));
    })]
  });
};