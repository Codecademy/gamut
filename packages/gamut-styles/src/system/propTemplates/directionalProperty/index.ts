import { CSSObject } from '@emotion/core';
import { AbstractSystemConfig, StyleTemplate } from '../../types';

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
    top: 'borderLeftColor',
    bottom: 'borderBottomWidth',
  },
} as const;

type DirectionalProps = typeof DIRECTIONAL_PROPS;

export function directionalProperty<
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(propName: K['propName'], computeValue: K['computeValue']): StyleTemplate<T> {
  return (props: T): CSSObject => {
    const {
      [propName as string]: base,
      [`${propName}X`]: x = base,
      [`${propName}Y`]: y = base,
      [`${propName}Left`]: l = x,
      [`${propName}Right`]: r = x,
      [`${propName}Top`]: t = y,
      [`${propName}Bottom`]: b = y,
    } = props as Record<string, unknown>;
    const propKey = propName as keyof DirectionalProps;
    const orderedProps = [t, r, b, l];

    const styles = {} as CSSObject;

    DIRECTIONS.forEach((direction, i) => {
      if (orderedProps[i] !== undefined) {
        const prop = DIRECTIONAL_PROPS[propKey][direction];
        const value = computeValue!(orderedProps[i]) as string;

        styles[prop] = value;
      }
    });
    return styles;
  };
}
