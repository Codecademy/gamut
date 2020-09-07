import { directionalProperty } from 'polished';
import { AbstractSystemConfig } from '../types';

export function directional<T>(config: AbstractSystemConfig) {
  const { propName, scale, computeValue } = config;
  return (props: T) => {
    const {
      [propName as string]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props as Record<string, typeof scale[number]>;

    return directionalProperty(
      propName as string,
      ...[t, r, b, l].map(computeValue)
    );
  };
}
