function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createScaleValueTransformer } from '../../transforms/transformScaleValues';
export var createStandardStyleTemplate = function createStandardStyleTemplate(config) {
  var property = config.property,
      prop = config.propName,
      transformValue = config.transformValue;
  var getScaleFunction = createScaleValueTransformer(config);
  return function (props) {
    var getScalarValue = getScaleFunction(props);
    var propValue = getScalarValue(props[prop]);
    return propValue !== undefined ? _defineProperty({}, property || prop, transformValue(propValue)) : propValue;
  };
};