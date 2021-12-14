import { get, identity, isNumber, isObject, isString } from 'lodash';
export var deriveScaleFunction = function deriveScaleFunction(scale) {
  if (isObject(scale)) {
    return function (value) {
      return isString(value) || isNumber(value) ? get(scale, value, value) : value;
    };
  }

  return identity;
};
export var createScaleValueTransformer = function createScaleValueTransformer(_ref) {
  var scale = _ref.scale;

  if (isString(scale)) {
    return function (props) {
      return deriveScaleFunction(get(props, ['theme', scale]));
    };
  }

  return function (props) {
    return deriveScaleFunction(scale);
  };
};