function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { system } from '..';
describe('system', function () {
  var _system$create = system.create({}),
      properties = _system$create.properties,
      variant = _system$create.variant,
      groups = _objectWithoutProperties(_system$create, ["properties", "variant"]);

  describe('initializing system', function () {
    it('initializes a system with any empty config', function () {
      expect(properties).toBeDefined();
      expect(groups).toBeDefined();
      expect(variant).toBeDefined();
    });
  });
  describe('variant', function () {
    it('returns a style function with a propKey of variant by default', function () {
      var myVariant = variant({
        primary: {
          textColor: 'blue'
        },
        secondary: {
          textColor: 'green',
          backgroundColor: 'green',
          fontFamily: 'serif'
        }
      });
      expect(myVariant({
        variant: 'primary'
      })).toEqual({
        color: 'blue'
      });
    });
    it('can configure a different propKey', function () {
      var myVariant = variant({
        prop: 'colorVariant',
        variants: {
          primary: {
            textColor: 'blue'
          },
          secondary: {
            textColor: 'green'
          }
        }
      });
      expect(myVariant({
        colorVariant: 'secondary'
      })).toEqual({
        color: 'green'
      });
    });
    it('can configure a default variant', function () {
      var myVariant = variant({
        "default": 'primary',
        variants: {
          primary: {
            textColor: 'blue'
          },
          secondary: {
            textColor: 'green'
          }
        }
      });
      expect(myVariant({})).toEqual({
        color: 'blue'
      });
    });
    it('can configure using a variants key without a prop or default key', function () {
      var myVariant = variant({
        variants: {
          primary: {
            textColor: 'blue'
          },
          secondary: {
            textColor: 'green'
          }
        }
      });
      expect(myVariant({
        variant: 'secondary'
      })).toEqual({
        color: 'green'
      });
    });
  });
  describe('Custom Scales', function () {
    var _system$create2 = system.create({
      typography: {
        fontSize: {
          propName: 'fontSize',
          scale: {
            sm: '14px',
            md: '16px'
          }
        }
      }
    }),
        typography = _system$create2.typography,
        variant = _system$create2.variant;

    it('theme scale values are found off of the specified theme', function () {
      expect(typography({
        fontSize: 'md'
      })).toEqual({
        fontSize: '16px'
      });
    });
    it('variants calculate theme values', function () {
      var textVariants = variant({
        caption: {
          fontSize: 'sm'
        },
        paragraph: {
          fontSize: 'md'
        }
      });
      expect(textVariants({
        variant: 'caption'
      })).toEqual({
        fontSize: '14px'
      });
    });
  });
  describe('Theme Scales', function () {
    var _system$withTheme$cre = system.withTheme().create({
      typography: {
        fontSize: {
          propName: 'fontSize',
          scale: 'fontSize'
        }
      }
    }),
        typography = _system$withTheme$cre.typography,
        variant = _system$withTheme$cre.variant;

    var theme = {
      fontSize: {
        sm: '14px',
        md: '16px'
      }
    };
    it('theme scale values are found off of the specified theme', function () {
      expect(typography({
        fontSize: 'md',
        theme: theme
      })).toEqual({
        fontSize: '16px'
      });
    });
    it('variants calculate theme values', function () {
      var textVariants = variant({
        caption: {
          fontSize: 'sm'
        },
        paragraph: {
          fontSize: 'md'
        }
      });
      expect(textVariants({
        variant: 'caption',
        theme: theme
      })).toEqual({
        fontSize: '14px'
      });
    });
  });
  describe('base system', function () {
    describe('groups', function () {
      Object.entries(groups).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            group = _ref2[0],
            styleFunction = _ref2[1];

        it("".concat(group, " composite renders without breaking"), function () {
          expect(styleFunction).toBeDefined();
        });
      });
    });
    describe('properties', function () {
      Object.entries(properties).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            property = _ref4[0],
            styleFunction = _ref4[1];

        it("".concat(property, " composite renders without breaking"), function () {
          expect(styleFunction).toBeDefined();
        });
      });
    });
  });
});