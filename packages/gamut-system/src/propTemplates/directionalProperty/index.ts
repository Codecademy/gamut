import { CSSObject } from '@emotion/core';
import { get, isObject } from 'lodash';
import { DirectionalProperties } from '../../types/properties';
import {
  AbstractProps,
  AbstractPropertyConfig,
  StyleTemplate,
  ScaleMap,
  ScaleArray,
} from '../../types/system';
import { DIRECTIONAL_PROPS, DIRECTIONS } from './constants';

/**
 * Directional props require destructuring of their values to ensure their order.  Instead
 * of sorting the styles to make overrides make sense we handle all of these props at once
 * and use upstream previous values to initialize downstream ones such that upstream specific
 * values will not be overriden by the CSS cascade erroneously.  We prefer this over manually
 * sorting properties at runtime and having consistent CSS for these particular props.
 */
export function directionalProperty<
  Props extends AbstractProps,
  Config extends AbstractPropertyConfig &
    Required<Pick<AbstractPropertyConfig, 'propName' | 'computeValue'>>
>({ propName, scale, computeValue }: Config): StyleTemplate<Props> {
  return (props: Props): CSSObject => {
    // Initialize all directional props from base => specific direction
    const {
      [propName]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props;
    const propKey = propName as DirectionalProperties;
    // Order props in their correct short hand order for consistency between components.
    const orderedProps = [t, r, b, l];

    const styles = {} as CSSObject;

    // Iterate over all possible directions
    DIRECTIONS.forEach((direction, i) => {
      let propValue = orderedProps[i];
      // If there's nothing don't add it to the style object
      if (propValue === undefined) {
        return;
      }

      let scaleShape = scale;
      if (typeof scaleShape === 'string') {
        scaleShape = get(props, `theme.${scale}`, {}) as ScaleMap | ScaleArray;
      }

      if (isObject(scaleShape)) {
        propValue = get(scaleShape, `${propValue}`, propValue);
      }

      // Look up valid directional prop name based on direction.
      const prop = DIRECTIONAL_PROPS[propKey][direction];
      // Do final calculations
      styles[prop] = computeValue(propValue) as string;
    });
    return styles;
  };
}
