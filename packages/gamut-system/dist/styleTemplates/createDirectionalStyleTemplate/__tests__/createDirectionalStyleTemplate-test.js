function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createDirectionalStyleTemplate } from '..';
describe(createDirectionalStyleTemplate, function () {
  it('creates a property function', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var templatedStyles = styleTemplate({
      margin: '10px'
    });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px'
    });
  });
  it('accepts a custom transform function', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return "".concat(val * 2, "px");
      }
    });
    var templatedStyles = styleTemplate({
      margin: 5
    });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px'
    });
  });
  it('does not template base when no configuration is given', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var leftStyles = styleTemplate({
      marginLeft: '10px'
    });
    expect(leftStyles).toEqual({
      marginLeft: '10px'
    });
    var YStyles = styleTemplate({
      marginY: '10px'
    });
    expect(YStyles).toEqual({
      marginTop: '10px',
      marginBottom: '10px'
    });
  });
  describe('directional overrides', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var directionalOverrides = {
      xAxis: [{
        margin: '10px',
        marginX: '5px'
      }, {
        marginTop: '10px',
        marginRight: '5px',
        marginBottom: '10px',
        marginLeft: '5px'
      }],
      yAxis: [{
        margin: '10px',
        marginY: '5px'
      }, {
        marginTop: '5px',
        marginRight: '10px',
        marginBottom: '5px',
        marginLeft: '10px'
      }],
      top: [{
        margin: '10px',
        marginY: '15px',
        marginTop: '20px'
      }, {
        marginTop: '20px',
        marginRight: '10px',
        marginBottom: '15px',
        marginLeft: '10px'
      }],
      bottom: [{
        margin: '10px',
        marginY: '15px',
        marginBottom: '20px'
      }, {
        marginTop: '15px',
        marginRight: '10px',
        marginBottom: '20px',
        marginLeft: '10px'
      }],
      left: [{
        margin: '10px',
        marginX: '15px',
        marginLeft: '20px'
      }, {
        marginTop: '10px',
        marginRight: '15px',
        marginBottom: '10px',
        marginLeft: '20px'
      }],
      right: [{
        margin: '10px',
        marginX: '15px',
        marginRight: '20px'
      }, {
        marginTop: '10px',
        marginRight: '20px',
        marginBottom: '10px',
        marginLeft: '15px'
      }]
    };
    Object.keys(directionalOverrides).forEach(function (key) {
      var _directionalOverrides = _slicedToArray(directionalOverrides[key], 2),
          props = _directionalOverrides[0],
          expected = _directionalOverrides[1];

      it("overrides the ".concat(key, " propeties when configured"), function () {
        expect(styleTemplate(props)).toEqual(expected);
      });
    });
  });
  it('looks up literal map scale values when configured', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: {
        sm: '10px'
      }
    });
    var themeValues = styleTemplate({
      marginTop: 'sm'
    });
    expect(themeValues).toEqual({
      marginTop: '10px'
    });
  });
  it('if literal map scale values cannot be found it returns the the original value', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: {
        sm: '10px'
      }
    });
    var themeValues = styleTemplate({
      marginTop: 'notSm'
    });
    expect(themeValues).toEqual({
      marginTop: 'notSm'
    });
  });
  it('returns the original value if array scale values are provided', function () {
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: ['10px', '20px']
    });
    var themeValues = styleTemplate({
      marginTop: 'sms'
    });
    expect(themeValues).toEqual({
      marginTop: 'sms'
    });
  });
  it('looks up theme map scale values when configured with a theme scale', function () {
    var theme = {
      spacing: {
        sm: '10px',
        md: '20px'
      }
    };
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      marginTop: 'sm',
      theme: theme
    });
    expect(themeValues).toEqual({
      marginTop: '10px'
    });
  });
  it('if theme map scale values cannot be found it returns the the original value, when configured with a theme scale', function () {
    var theme = {
      spacing: {
        sm: '10px',
        md: '20px'
      }
    };
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      marginTop: 'sms',
      theme: theme
    });
    expect(themeValues).toEqual({
      marginTop: 'sms'
    });
  });
  it('returns the original value if array scale values are provided', function () {
    var theme = {
      spacing: [10, 20]
    };
    var styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      marginTop: 'sms',
      theme: theme
    });
    expect(themeValues).toEqual({
      marginTop: 'sms'
    });
  });
});