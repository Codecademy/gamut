function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { identity } from 'lodash';
import { border, layout, typography } from '../../../props';
import { createDirectionalStyleTemplate, createStandardStyleTemplate } from '../../../styleTemplates';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { createHandler } from '../../createHandler';
import { compose } from '..';
var display = createHandler(layout.display);
var textAlign = createHandler(typography.textAlign);
var borderWidth = createHandler(border.borderWidth);
describe(compose, function () {
  it('creates a handler from multiple handlers', function () {
    var displayAndTextAlign = compose(display, textAlign);
    expect(displayAndTextAlign({
      textAlign: 'center',
      display: 'block'
    })).toEqual({
      textAlign: 'center',
      display: 'block'
    });
  });
  it('creates a handler that can template responsive configurations', function () {
    var _expect$toEqual;

    var displayAndTextAlign = compose(display, textAlign);
    expect(displayAndTextAlign({
      textAlign: [, 'center'],
      display: {
        lg: 'block'
      }
    })).toEqual((_expect$toEqual = {}, _defineProperty(_expect$toEqual, DEFAULT_MEDIA_QUERIES.xs, {
      textAlign: 'center'
    }), _defineProperty(_expect$toEqual, DEFAULT_MEDIA_QUERIES.lg, {
      display: 'block'
    }), _expect$toEqual));
  });
  it('adds all prop names the handler is responsible for to a key on the returned function object', function () {
    var _compose = compose(display, textAlign),
        propNames = _compose.propNames;

    expect(propNames).toEqual(['display', 'textAlign']);
  });
  it('adds all altProp names the handler is responsible for to a key on the returned function object', function () {
    var _compose2 = compose(display, textAlign, borderWidth),
        propNames = _compose2.propNames;

    expect(propNames).toEqual(['display', 'textAlign', 'borderWidth'].concat(_toConsumableArray(border.borderWidth.dependentProps)));
  });
  it('adds template functions for each prop to its template functionMap', function () {
    var _styleTemplates$textA, _styleTemplates$displ, _styleTemplates$borde;

    var _compose3 = compose(display, textAlign, borderWidth),
        styleTemplates = _compose3.styleTemplates;

    expect(Object.keys(styleTemplates)).toEqual(['display', 'textAlign', 'borderWidth']);
    expect((_styleTemplates$textA = styleTemplates.textAlign) === null || _styleTemplates$textA === void 0 ? void 0 : _styleTemplates$textA.toString()).toEqual(createStandardStyleTemplate({
      propName: 'textAlign',
      transformValue: identity
    }).toString());
    expect((_styleTemplates$displ = styleTemplates.display) === null || _styleTemplates$displ === void 0 ? void 0 : _styleTemplates$displ.toString()).toEqual(createStandardStyleTemplate({
      propName: 'display',
      transformValue: identity
    }).toString());
    expect((_styleTemplates$borde = styleTemplates.borderWidth) === null || _styleTemplates$borde === void 0 ? void 0 : _styleTemplates$borde.toString()).toEqual(createDirectionalStyleTemplate({
      propName: 'borderWidth',
      transformValue: identity
    }).toString());
  });
  it('lets the composite function be composed again', function () {
    var displayAndTextAlign = compose(display, textAlign);
    var furtherComposition = compose(displayAndTextAlign, borderWidth);
    expect(furtherComposition({
      textAlign: 'center',
      display: 'block',
      borderWidth: 'inherit'
    })).toEqual({
      textAlign: 'center',
      display: 'block',
      borderBottomWidth: 'inherit',
      borderLeftWidth: 'inherit',
      borderRightWidth: 'inherit',
      borderTopWidth: 'inherit'
    });
  });
});