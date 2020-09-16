import {
  AbstractSystemConfig,
  PropAlias,
  StyleMap,
  StyleTemplate,
} from '../../types';
import { CSSObject } from '@emotion/core';

type AllDirections = 'top' | 'right' | 'left' | 'bottom';

const DIRECTIONS: AllDirections[] = ['top', 'right', 'bottom', 'left'];

const directionalRules: Partial<Record<
  PropAlias,
  (direction: AllDirections) => string
>> = {
  margin: (direction: AllDirections) => `margin-${direction}`,
  padding: (direction: AllDirections) => `padding-${direction}`,
  borderWidth: (direction: AllDirections) => `border-${direction}-width`,
  borderColor: (direction: AllDirections) => `border-${direction}-color`,
  borderStyle: (direction: AllDirections) => `border-${direction}-style`,
};

export function directionalProperty<
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(propName: K['propName'], computeValue: K['computeValue']): StyleTemplate<T> {
  return (props: T): StyleMap => {
    const {
      [propName as string]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props as Record<string, unknown>;
    const propKey = propName as PropAlias;
    const orderedProps = [t, r, b, l];

    const styles = {} as StyleMap;

    for (let i = 0; i < DIRECTIONS.length; i += 1) {
      if (orderedProps[i] !== undefined) {
        const prop = directionalRules?.[propKey]!(
          DIRECTIONS[i]
        ) as keyof CSSObject;
        styles[prop] = computeValue!(orderedProps[i]);
      }
    }
    return styles;
  };
}
