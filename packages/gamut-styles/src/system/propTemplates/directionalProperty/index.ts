import { CSSObject } from '@emotion/core';
import { AbstractPropConfig, AbstractProps, StyleTemplate } from '../../types';

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
  Config extends Required<Omit<AbstractPropConfig, 'scale'>>,
  Props extends AbstractProps
>({ propName, computeValue }: Config): StyleTemplate<Props> {
  return (props: Props): CSSObject => {
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
    const orderedProps = [t, r, b, l];

    const styles = {} as CSSObject;

    DIRECTIONS.forEach((direction, i) => {
      if (orderedProps[i] !== undefined) {
        const prop = DIRECTIONAL_PROPS[propKey][direction];
        const value = computeValue(orderedProps[i]) as string;

        styles[prop] = value;
      }
    });
    return styles;
  };
}
