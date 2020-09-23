import {
  AbstractTheme,
  ThematicConfig,
  ThematicProps,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
} from '../../types';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { registerHandler } from '../registerHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';

type BasePropConfig = typeof BaseProps;

export const system = <
  T extends AbstractTheme,
  C extends Record<string, Record<string, ThematicConfig<T>>>
>(
  config: C,
  theme?: T
) => {
  const system = {
    handlers: {},
    groups: {},
  } as any;
  const props = merge(BaseProps, config) as any;
  entries(props).forEach(([groupKey, groupProps]) => {
    const handlers = mapValues(groupProps as any, (prop) =>
      registerHandler(prop)
    );
    system.handlers = merge(system.handlers, handlers);
    system.groups[groupKey] = compose(...values(handlers));
  });

  const createVariant = (config: any) => {
    const props = uniq(
      values(config).reduce(
        (carry, variant) => carry.concat(keys(variant)),
        [] as any
      )
    );

    const handlers = pick(system.handlers, props as any);
    const variantHandler = compose(...values(handlers));

    return (props: { variant: any; theme: T }) => {
      const variantProps = config[props.variant];
      return variantHandler({ ...variantProps, theme: props.theme });
    };
  };
  system.createVariant = createVariant;

  type Merged = BasePropConfig & C;

  type BaseGroup = {
    [P in keyof Merged]: {
      handlers: {
        [D in keyof Merged[P]]: Handler<ThematicProps<T, Merged[P][D]>>;
      };
      props: {
        [S in keyof Merged[P]]: ThematicScaleValue<T, Merged[P][S]>;
      };
      composed: Handler<ThematicProps<T, Merged[P][keyof Merged[P]]>>;
    };
  };

  type Handlers = UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
  type Props = UnionToIntersection<BaseGroup[keyof BaseGroup]['props']>;
  type Composed = {
    [P in keyof BaseGroup]: BaseGroup[P]['composed'];
  };
  type VariantCreator = <Variant extends Record<string, Partial<Props>>>(
    config: Variant
  ) => (props: { variant: keyof Variant }) => CSSObject;

  type ReturnedSystem = {
    groups: Composed;
    handlers: Handlers;
    createVariant: VariantCreator;
  };

  return system as ReturnedSystem;
};
