import { CSSObject } from '@emotion/core';
import {
  AbstractProps,
  AbstractSystemConfig,
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

export function directionalProperty<
  Props extends AbstractProps,
  Config extends AbstractSystemConfig
>(
  propName: Config['propName'],
  computeValue: Config['computeValue']
): StyleTemplate<Props> {
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
        const value = computeValue!(orderedProps[i]) as string;

        styles[prop] = value;
      }
    });
    return styles;
  };
}
