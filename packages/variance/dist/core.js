function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import get from 'lodash/get';
import identity from 'lodash/identity';
import merge from 'lodash/merge';
import { orderPropNames } from './utils/propNames';
import { arrayParser, isMediaArray, isMediaMap, objectParser, parseBreakpoints } from './utils/responsive';
export var variance = {
  withTheme: function withTheme() {
    return {
      // Parser to handle any set of configured props
      createParser: function createParser(config) {
        var breakpoints;
        var propNames = orderPropNames(config);

        var parser = function parser(props) {
          var _ref, _breakpoints;

          var styles = {}; // Get the themes configured breakpoints

          breakpoints = (_ref = (_breakpoints = breakpoints) !== null && _breakpoints !== void 0 ? _breakpoints : parseBreakpoints(props === null || props === void 0 ? void 0 : props.theme)) !== null && _ref !== void 0 ? _ref : {};
          var _breakpoints2 = breakpoints,
              map = _breakpoints2.map,
              array = _breakpoints2.array; // Loops over all prop names on the configured config to check for configured styles

          propNames.forEach(function (prop) {
            var property = config[prop];
            var value = get(props, prop);

            switch (_typeof(value)) {
              case 'string':
              case 'number':
                return Object.assign(styles, property.styleFn(value, prop, props));
              // handle any props configured with the responsive notation

              case 'object':
                if (!map && !array) return; // If it is an array the order of values is smallest to largest: [base, xs, ...]

                if (isMediaArray(value)) {
                  return merge(styles, arrayParser(value, props, property, array));
                } // If it is an object with keys


                if (isMediaMap(value)) {
                  return merge(styles, objectParser(value, props, property, map));
                }

            }
          });
          return styles;
        }; // return the parser function with the resulting meta information for further composition


        return Object.assign(parser, {
          propNames: propNames,
          config: config
        });
      },
      // Given a single property configuration enrich the config with a transform function
      // that traverses the properties the function is responsible for.
      createTransform: function createTransform(prop, config) {
        var _config$transform;

        var transform = (_config$transform = config.transform) !== null && _config$transform !== void 0 ? _config$transform : identity;
        var properties = config.properties ? config.properties : [config.property];
        return _objectSpread(_objectSpread({}, config), {}, {
          prop: prop,
          styleFn: function styleFn(value, prop, props) {
            var styles = {};
            var scaleVal;

            switch (_typeof(config.scale)) {
              case 'string':
                {
                  var path = "theme.".concat(config.scale, ".").concat(value);
                  scaleVal = get(props, path, value);
                  break;
                }

              case 'object':
                {
                  scaleVal = get(config.scale, "".concat(value));
                  break;
                }

              default:
                scaleVal = value;
            } // for each property look up the scale value from theme if passed and apply any
            // final transforms to the value


            properties.forEach(function (property) {
              styles[property] = transform(scaleVal, property, props);
            }); // return the resulting styles object

            return styles;
          }
        });
      },
      compose: function compose() {
        for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
          parsers[_key] = arguments[_key];
        }

        return this.createParser(parsers.reduce(function (carry, parser) {
          return _objectSpread(_objectSpread({}, carry), parser.config);
        }, {}));
      },
      create: function create(config) {
        var transforms = {}; // Create a transform function for each of the props

        for (var prop in config) {
          if (typeof prop === 'string') {
            transforms[prop] = this.createTransform(prop, config[prop]);
          }
        } // Create a parser that handles all the props within the config


        return this.createParser(transforms);
      }
    };
  }
};