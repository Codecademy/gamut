import { get, identity, isObject } from 'lodash';

import { Prop, PropTransformer } from '../types/config';
import { CSSObject } from '../types/props';

export function createTransform<P extends string, Config extends Prop>(
  prop: P,
  config: Config
): PropTransformer<P, Config> {
  const {
    transform = identity,
    property,
    properties = [property],
    scale,
  } = config;

  return {
    ...config,
    prop,
    styleFn: (value, prop, props) => {
      const styles: CSSObject = {};
      let scaleVal: string | number | undefined;
      switch (typeof scale) {
        case 'string': {
          const path = `theme.${scale}.${value}`;
          scaleVal = get(props, path);
          break;
        }
        case 'object': {
          scaleVal = get(scale, `${value}`);
          break;
        }
        case 'undefined':
        default:
      }

      const useTransform = scaleVal !== undefined || scale === undefined;

      const usedValue = scaleVal ?? (value as string | number);

      // for each property look up the scale value from theme if passed and apply any
      // final transforms to the value
      properties.forEach((property) => {
        const finalValue = useTransform
          ? transform(usedValue, property, props)
          : usedValue;
        const mergeStyles = isObject(finalValue)
          ? finalValue
          : { [property]: finalValue };

        Object.assign(styles, mergeStyles);
      });
      // return the resulting styles object
      return styles;
    },
  };
}
