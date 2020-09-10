import { AbstractSystemConfig, StyleTemplate } from '../types';
import { PropAlias } from '../constants';

type AllDirections = 'top' | 'right' | 'left' | 'bottom';

const DIRECTIONS: AllDirections[] = ['top', 'right', 'left', 'bottom'];

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

export function directional<
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(
  propName: K['propName'] | K['propName'][number],
  computeValue: K['computeValue']
): StyleTemplate<T> {
  return (props: T) => {
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

    const propertyValues = DIRECTIONS.map((direction) =>
      directionalRules?.[propKey]!(direction)
    );

    return `${[t, r, b, l]
      .map((value, index) => {
        if (value !== undefined) {
          return `${propertyValues[index]}: ${computeValue(value)};`;
        }
        return '';
      })
      .join(' ')}`;
  };
}
