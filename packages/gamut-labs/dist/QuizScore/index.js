import { Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { CheckFilledIcon, DeleteFilledIcon } from '@codecademy/gamut-icons';
import * as React from 'react';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var QuizScore = function QuizScore(_ref) {
  var correctCount = _ref.correctCount,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'row' : _ref$layout,
    smallerFont = _ref.smallerFont,
    total = _ref.total,
    numOfRows = _ref.numOfRows,
    colorfulIcons = _ref.colorfulIcons;
  var isRowLayout = layout === 'row';
  var moreThan5Rows = !isRowLayout && numOfRows && numOfRows > 5;
  var quizScore = total < 1 ? 0 : Math.round(correctCount / total * 100);
  var affirmation = quizScore > 70 ? 'Great job!' : 'Practice makes perfect!';
  return /*#__PURE__*/_jsxs(GridBox, {
    gridTemplateColumns: isRowLayout ? {
      _: 'minmax(0,1fr)',
      md: '1fr min-content 1fr'
    } : '',
    gridTemplateRows: isRowLayout ? '' : 'min-content 1fr min-content',
    fontFamily: "accent",
    gap: {
      _: 16,
      sm: 8
    },
    mb: {
      _: !isRowLayout ? 16 : 32,
      sm: 16
    },
    children: [/*#__PURE__*/_jsxs(FlexBox, {
      flexDirection: "column",
      textAlign: "center",
      children: [/*#__PURE__*/_jsxs(Text, {
        fontSize: smallerFont ? 34 : 44,
        children: [quizScore, "%"]
      }), /*#__PURE__*/_jsx(Text, {
        fontSize: 14,
        children: affirmation
      })]
    }), /*#__PURE__*/_jsx(Box, {
      borderRight: 1,
      borderBottom: 1,
      width: "100%",
      height: "100%",
      display: {
        _: 'none',
        xs: 'block'
      }
    }), /*#__PURE__*/_jsxs(GridBox, {
      gridTemplateColumns: moreThan5Rows ? 'repeat(2,minmax(0,max-content))' : layout === 'row' ? 'repeat(2,minmax(0,max-content))' : {
        _: 'repeat(2,minmax(0,max-content))',
        xl: '20px 1fr 20px 1fr'
      },
      gridTemplateRows: moreThan5Rows ? '1fr 1fr' : '',
      alignItems: "center",
      columnGap: 16,
      justifyContent: "center",
      display: total === correctCount ? 'flex' : 'grid',
      children: [/*#__PURE__*/_jsx(CheckFilledIcon, {
        color: colorfulIcons ? 'feedback-success' : 'inherit',
        "aria-hidden": true,
        size: 24
      }), /*#__PURE__*/_jsxs(Text, {
        fontSize: smallerFont ? 16 : 22,
        lineHeight: 2,
        children: [correctCount, " correct"]
      }), correctCount < total && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(DeleteFilledIcon, {
          color: colorfulIcons ? 'feedback-error' : 'inherit',
          "aria-hidden": true,
          size: 24
        }), /*#__PURE__*/_jsx(Text, {
          fontSize: smallerFont ? 16 : 22,
          lineHeight: 2,
          children: "".concat(total - correctCount, " to work on")
        })]
      })]
    })]
  });
};