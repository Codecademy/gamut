import { CSSObject } from '@emotion/core';
import { themeScaleValue } from '../../transforms/themeScaleValue';
import {
  AbstractProps,
  AbstractPropertyConfig,
  StyleTemplate,
} from '../../types/system';

type AllDirections = 'top' | 'right' | 'left' | 'bottom';
const DIRECTIONS: AllDirections[] = ['top', 'right', 'bottom', 'left'];

const DIRECTIONAL_PROPS = {
  margin: {
    left: 'marginLeft',
    right: 'marginRight',
    top: 'marginTop',
    bottom: 'marginBottom',
  },
  padding: {
    left: 'paddingLeft',
    right: 'paddingRight',
    top: 'paddingTop',
    bottom: 'paddingBottom',
  },
  borderColor: {
    left: 'borderLeftColor',
    right: 'borderRightColor',
    top: 'borderTopColor',
    bottom: 'borderBottomColor',
  },
  borderWidth: {
    left: 'borderLeftWidth',
    right: 'borderRightWidth',
    top: 'borderTopWidth',
    bottom: 'borderBottomWidth',
  },
} as const;

type DirectionalProps = typeof DIRECTIONAL_PROPS;

/**
 * Directional props requrie destructuring of their values to ensure their order.  Instead
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
      [propName as string]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props as AbstractProps;
    const propKey = propName as keyof DirectionalProps;
    // Order props in their correct short hand order for consistency.
    const orderedProps = [t, r, b, l];

    const styles = {} as CSSObject;

    // Iterate over all possible directions
    DIRECTIONS.forEach((direction, i) => {
      // Get value
      const value = themeScaleValue(
        props as any,
        scale,
        orderedProps[i] as any
      );
      // If there's nothing don't add it to the style object
      if (value === undefined) return;

      // Look up valid directional prop name based on direction.
      const prop = DIRECTIONAL_PROPS[propKey][direction];
      // Do final calculations
      styles[prop] = computeValue(value) as string;
    });
    return styles;
  };
}
