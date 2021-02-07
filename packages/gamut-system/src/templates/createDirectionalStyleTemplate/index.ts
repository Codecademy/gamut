import { createScaleValueTransformer } from '../../transforms/transformScaleValues';
import {
  AbstractPropertyConfig,
  AbstractProps,
  StyleTemplate,
} from '../../types/config';
import { CSSObject } from '../../types/css';
import { DirectionalProperty } from '../../types/properties';
import { DIRECTIONAL_PROPS } from './constants';

/**
 * Directional props require destructuring of their values to ensure their order.  Instead
 * of sorting the styles to make overrides make sense we handle all of these props at once
 * and use upstream previous values to initialize downstream ones such that upstream specific
 * values will not be overriden by the CSS cascade erroneously.  We prefer this over manually
 * sorting properties at runtime and having consistent CSS for these particular props.
 */

const destructureByDirection = <
  PropName extends DirectionalProperty,
  Props extends Record<string, unknown>
>(
  propName: PropName,
  props: Props
) => {
  if (propName === 'borderRadius') {
    const {
      [propName]: base,
      [`${propName}Top`]: t = base,
      [`${propName}Bottom`]: b = base,
      [`${propName}Left`]: r = base,
      [`${propName}Right`]: l = base,
      [`${propName}TopLeft`]: tl = l || t,
      [`${propName}TopRight`]: tr = t || r,
      [`${propName}BottomLeft`]: bl = b || l,
      [`${propName}BottomRight`]: br = l || r,
    } = props;

    return [tl, tr, bl, br];
  }

  const {
    [propName]: base,
    [`${propName}X`]: x = base,
    [`${propName}Y`]: y = base,
    [`${propName}Left`]: l = x,
    [`${propName}Right`]: r = x,
    [`${propName}Top`]: t = y,
    [`${propName}Bottom`]: b = y,
  } = props;

  return [t, r, b, l];
};

export function createDirectionalStyleTemplate<
  Props extends AbstractProps,
  Config extends AbstractPropertyConfig & { propName: DirectionalProperty }
>(config: Config): StyleTemplate<Props> {
  const { propName, scale, transformValue } = config;
  const getScaleFunction = createScaleValueTransformer(config);

  const template = (props: Props): CSSObject => {
    const scaleTransform = getScaleFunction(props);
    // Initialize all directional props from base => specific direction

    const propKey = propName;
    // Order props in their correct short hand order for consistency between components.
    const orderedProps = destructureByDirection(propName, props);
    const styles: CSSObject = {};

    // Iterate over all possible directions
    orderedProps.forEach((direction, i) => {
      const propValue = scaleTransform(direction);
      // If there's nothing don't add it to the style object
      if (propValue === undefined) return;

      // Look up valid directional prop name based on direction.
      const prop = DIRECTIONAL_PROPS[propKey][i];
      // Do final calculations
      styles[prop] = transformValue ? transformValue(propValue) : propValue;
    });
    return styles;
  };

  return Object.assign(template, {
    type: 'directional',
    scale: scale as string,
  } as const);
}
