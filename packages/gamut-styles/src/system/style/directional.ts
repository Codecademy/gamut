import { directionalProperty } from 'polished';
import { ScaleShape, AbstractSystemConfig, AnyStyle } from '../types';

export function directional<
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(config: K): (props: T) => AnyStyle {
  const { propName, computeValue } = config;
  return (props: T) => {
    const {
      [propName as string]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props as Record<string, ScaleShape[number]>;

    return directionalProperty(
      propName as string,
      ...[t, r, b, l].map(computeValue)
    );
  };
}
