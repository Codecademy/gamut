function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Anchor, Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { CheckFilledIcon, DeleteFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import * as React from 'react';
import { QuizScore } from '../QuizScore';
import { createResumeUrlPath } from './helpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var SHOW_REVIEW_SCORE = 0.6;
var PASSING_SCORE = 0.7;
var renderSubScores = function renderSubScores(_ref) {
  var subScores = _ref.subScores,
    pathSlug = _ref.pathSlug,
    trackSlug = _ref.trackSlug,
    trackingData = _ref.trackingData,
    trackUserClick = _ref.trackUserClick,
    colorfulIcons = _ref.colorfulIcons;
  return Object.entries(subScores).map(function (_ref2, i) {
    var _ref3 = _slicedToArray(_ref2, 2),
      subContentId = _ref3[0],
      _ref3$ = _ref3[1],
      subContentTitle = _ref3$.title,
      subContentCorrect = _ref3$.correct,
      subContentTotal = _ref3$.total,
      subContentSlug = _ref3$.slug;
    var subContentPercentCorrect = subContentCorrect / subContentTotal;
    var reviewConceptsPath = createResumeUrlPath({
      pathSlug: pathSlug,
      trackSlug: trackSlug,
      moduleSlug: subContentSlug
    });
    return /*#__PURE__*/_jsxs(FlexBox, {
      borderTop: i !== 0 ? 1 : 'none',
      px: 16,
      py: 8,
      justifyContent: "space-between",
      alignItems: "center",
      children: [/*#__PURE__*/_jsxs(FlexBox, {
        alignItems: "center",
        children: [colorfulIcons ? subContentPercentCorrect >= PASSING_SCORE ? /*#__PURE__*/_jsx(CheckFilledIcon, {
          minWidth: 16,
          mr: 12,
          color: "feedback-success"
        }) : /*#__PURE__*/_jsx(DeleteFilledIcon, {
          minWidth: 16,
          mr: 12,
          color: "feedback-error"
        }) : null, /*#__PURE__*/_jsx(Text, {
          fontWeight: "bold",
          children: subContentTitle
        })]
      }), /*#__PURE__*/_jsxs(FlexBox, {
        fontSize: 14,
        minWidth: subContentPercentCorrect < SHOW_REVIEW_SCORE && trackSlug ? '11rem' : '3rem',
        justifyContent: "flex-end",
        children: [subContentPercentCorrect < SHOW_REVIEW_SCORE && trackSlug && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Anchor, {
            "aria-label": "Review concepts for ".concat(subContentTitle),
            mr: 16,
            href: reviewConceptsPath,
            onClick: function onClick() {
              return trackingData && (trackUserClick === null || trackUserClick === void 0 ? void 0 : trackUserClick(_objectSpread(_objectSpread({}, trackingData), {}, {
                course_progress: parseFloat(subContentPercentCorrect.toFixed(4)),
                href: reviewConceptsPath,
                module_id: subContentId
              })));
            },
            children: "Review Concepts"
          }), ' ']
        }), /*#__PURE__*/_jsx(Text, {
          "aria-label": "".concat(subContentCorrect, " out of ").concat(subContentTotal, " correct"),
          children: "".concat(subContentCorrect, " / ").concat(subContentTotal)
        })]
      })]
    }, subContentId);
  });
};
var renderUntestedSubContent = function renderUntestedSubContent(_ref4) {
  var untestedSubContent = _ref4.untestedSubContent,
    lighterBorderColor = _ref4.lighterBorderColor;
  return /*#__PURE__*/_jsx(FlexBox, {
    flexDirection: "column",
    borderWidth: 1,
    borderWidthTop: 0,
    borderStyle: "solid",
    borderColor: lighterBorderColor,
    children: untestedSubContent.map(function (_ref5, i) {
      var id = _ref5.id,
        title = _ref5.title;
      return /*#__PURE__*/_jsxs(FlexBox, {
        borderWidth: 1,
        borderWidthTop: i === 0 ? 0 : 1,
        borderStyle: "solid",
        borderColor: lighterBorderColor,
        px: 16,
        py: 8,
        justifyContent: "space-between",
        color: lighterBorderColor,
        children: [/*#__PURE__*/_jsx(Text, {
          flexGrow: 1,
          children: title
        }), /*#__PURE__*/_jsx(FlexBox, {
          fontSize: 14,
          alignItems: "center",
          minWidth: "6.5rem",
          justifyContent: "flex-end",
          children: /*#__PURE__*/_jsx(Text, {
            fontFamily: "accent",
            children: "Not tested"
          })
        })]
      }, id);
    })
  });
};
export var ScoreSummary = function ScoreSummary(_ref6) {
  var subScores = _ref6.subScores,
    totalCorrect = _ref6.totalCorrect,
    totalQuestions = _ref6.totalQuestions,
    pathSlug = _ref6.pathSlug,
    trackSlug = _ref6.trackSlug,
    trackingData = _ref6.trackingData,
    untestedSubContent = _ref6.untestedSubContent,
    _ref6$lighterBorderCo = _ref6.lighterBorderColor,
    lighterBorderColor = _ref6$lighterBorderCo === void 0 ? 'navy-400' : _ref6$lighterBorderCo,
    _ref6$layout = _ref6.layout,
    layout = _ref6$layout === void 0 ? 'row' : _ref6$layout,
    trackUserClick = _ref6.trackUserClick,
    description = _ref6.description,
    _ref6$noMaxWidth = _ref6.noMaxWidth,
    noMaxWidth = _ref6$noMaxWidth === void 0 ? false : _ref6$noMaxWidth,
    _ref6$colorfulIcons = _ref6.colorfulIcons,
    colorfulIcons = _ref6$colorfulIcons === void 0 ? false : _ref6$colorfulIcons;
  var numOfRows = Object.entries(subScores).length;
  if (untestedSubContent) {
    numOfRows += untestedSubContent.length;
  }
  var isRowLayout = layout === 'row';
  return /*#__PURE__*/_jsxs(GridBox, {
    gridTemplateColumns: isRowLayout ? {
      _: '',
      md: '2fr 3fr'
    } : '',
    children: [/*#__PURE__*/_jsxs(Box, {
      zIndex: 1,
      bg: "transparent",
      display: "inline",
      maxWidth: noMaxWidth ? '' : isRowLayout ? {
        _: pxRem(705),
        md: pxRem(500)
      } : pxRem(705),
      mr: isRowLayout ? {
        _: 0,
        md: 24
      } : 0,
      children: [/*#__PURE__*/_jsx(Box, {
        px: {
          _: 24,
          xs: 32
        },
        pt: 24,
        pb: 8,
        display: isRowLayout ? {
          _: 'flex',
          md: 'block'
        } : 'flex',
        flexDirection: isRowLayout ? {
          _: 'column',
          md: 'row'
        } : 'column',
        justifyContent: isRowLayout ? {
          _: 'center',
          md: ''
        } : 'center',
        border: 1,
        children: /*#__PURE__*/_jsx(QuizScore, {
          correctCount: totalCorrect,
          layout: isRowLayout ? 'column' : 'row',
          total: totalQuestions,
          smallerFont: true,
          numOfRows: numOfRows,
          colorfulIcons: colorfulIcons
        })
      }), description && /*#__PURE__*/_jsx(Box, {
        p: 16,
        pb: isRowLayout ? {
          _: 16,
          md: 0
        } : 16,
        border: isRowLayout ? {
          _: 1,
          md: 'none'
        } : 1,
        borderTop: "none",
        textAlign: isRowLayout ? {
          _: 'left',
          md: 'center'
        } : 'left',
        children: /*#__PURE__*/_jsx(Text, {
          fontSize: 14,
          children: description
        })
      })]
    }), /*#__PURE__*/_jsxs(FlexBox, {
      flexDirection: "column",
      maxWidth: noMaxWidth ? '' : pxRem(705),
      children: [/*#__PURE__*/_jsx(FlexBox, {
        flexDirection: "column",
        borderX: 1,
        borderBottom: 1,
        borderTop: isRowLayout ? {
          _: undefined,
          md: 1
        } : undefined,
        children: renderSubScores({
          subScores: subScores,
          pathSlug: pathSlug,
          trackSlug: trackSlug,
          trackingData: trackingData,
          trackUserClick: trackUserClick,
          colorfulIcons: colorfulIcons
        })
      }), /*#__PURE__*/_jsx(GridBox, {
        bg: "transparent",
        children: untestedSubContent && (untestedSubContent === null || untestedSubContent === void 0 ? void 0 : untestedSubContent.length) > 0 && renderUntestedSubContent({
          untestedSubContent: untestedSubContent,
          lighterBorderColor: lighterBorderColor
        })
      })]
    })]
  });
};