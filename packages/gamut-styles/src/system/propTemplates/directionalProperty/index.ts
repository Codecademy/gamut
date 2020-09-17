import { AbstractSystemConfig, StyleMap, StyleTemplate } from '../../types';

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
type AllAliases = DirectionalProps[keyof DirectionalProps][keyof DirectionalProps[keyof DirectionalProps]];

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
    const propKey = propName as keyof typeof DIRECTIONAL_PROPS;
    const orderedProps = [t, r, b, l];

    const styles = {} as Pick<StyleMap, AllAliases>;

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
