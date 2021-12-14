import { createScaleValueTransformer } from '../../transforms/transformScaleValues';
import { DIRECTIONAL_PROPS, DIRECTIONS } from './constants';
/**
 * Directional props require destructuring of their values to ensure their order.  Instead
 * of sorting the styles to make overrides make sense we handle all of these props at once
 * and use upstream previous values to initialize downstream ones such that upstream specific
 * values will not be overriden by the CSS cascade erroneously.  We prefer this over manually
 * sorting properties at runtime and having consistent CSS for these particular props.
 */

export function createDirectionalStyleTemplate(config) {
  var propName = config.propName,
      transformValue = config.transformValue;
  var getScaleFunction = createScaleValueTransformer(config);
  return function (props) {
    var scaleTransform = getScaleFunction(props); // Initialize all directional props from base => specific direction

    var base = props[propName],
        _props$ = props["".concat(propName, "X")],
        x = _props$ === void 0 ? base : _props$,
        _props$2 = props["".concat(propName, "Y")],
        y = _props$2 === void 0 ? base : _props$2,
        _props$3 = props["".concat(propName, "Left")],
        l = _props$3 === void 0 ? x : _props$3,
        _props$4 = props["".concat(propName, "Right")],
        r = _props$4 === void 0 ? x : _props$4,
        _props$5 = props["".concat(propName, "Top")],
        t = _props$5 === void 0 ? y : _props$5,
        _props$6 = props["".concat(propName, "Bottom")],
        b = _props$6 === void 0 ? y : _props$6;
    var propKey = propName; // Order props in their correct short hand order for consistency between components.

    var orderedProps = [t, r, b, l];
    var styles = {}; // Iterate over all possible directions

    DIRECTIONS.forEach(function (direction, i) {
      var propValue = scaleTransform(orderedProps[i]); // If there's nothing don't add it to the style object

      if (propValue === undefined) return; // Look up valid directional prop name based on direction.

      var prop = DIRECTIONAL_PROPS[propKey][direction]; // Do final calculations

      styles[prop] = transformValue(propValue);
    });
    return styles;
  };
}