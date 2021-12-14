function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { percentageOrAbsolute } from '..';
describe(percentageOrAbsolute, function () {
  it('returns 0 with no units', function () {
    expect(percentageOrAbsolute(0)).toBe(0);
  });
  var percentages = [[0.5, '50%'], [1 / 5, '20%'], [0.5, '50%'], [1, '100%'], [-1, '-100%'], [-0.4, '-40%'], [-1 / 4, '-25%']];
  percentages.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        percent = _ref2[0],
        result = _ref2[1];

    it("it parses the correct percentage of ".concat(percent, " as ").concat(result), function () {
      expect(percentageOrAbsolute(percent)).toEqual(result);
    });
  });
  var absoluteValues = [[5, '5px'], [-5, '-5px']];
  absoluteValues.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        value = _ref4[0],
        result = _ref4[1];

    it("transforms absolute value of ".concat(value, " to the pixel value of ").concat(result), function () {
      expect(percentageOrAbsolute(value)).toEqual(result);
    });
  });
});