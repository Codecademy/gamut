import {
  AbstractTheme,
  ThematicConfig,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
  GetAltProps,
} from '../../types';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { registerHandler } from '../registerHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import { getDefaultPropKey } from '../utils';

type BasePropConfig = typeof BaseProps;

export const system = <
  Theme extends AbstractTheme,
  Config extends Record<string, Record<string, ThematicConfig<Theme>>>
>(
  config: Config,
  theme?: Theme
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
      values(config)
        .reduce((carry, variant) => carry.concat(keys(variant)), [] as any)
        .map((prop: string) => getDefaultPropKey(prop))
    );

    const handlers = pick(system.handlers, props as any);
    const variantHandler = compose(...values(handlers));

    return (props: { variant: any; theme: Theme }) => {
      const variantProps = config[props.variant];
      return variantHandler({ ...variantProps, theme: props.theme });
    };
  };
  system.createVariant = createVariant;

  type Merged = BasePropConfig & Config;

  type BaseGroup = {
    [PropGroup in keyof Merged]: {
      handlers: {
        [Property in keyof Merged[PropGroup]]: Handler<
          Partial<
            Record<
              Property | GetAltProps<Merged[PropGroup][Property]>,
              ThematicScaleValue<Theme, Merged[PropGroup][Property]>
            >
          >
        >;
      };
      props: {
        [Property in keyof Merged[PropGroup]]: Partial<
          Record<
            Property | GetAltProps<Merged[PropGroup][Property]>,
            ThematicScaleValue<Theme, Merged[PropGroup][Property]>
          >
        >;
      };
    };
  };

  type PropGroups = {
    [PropGroup in keyof BaseGroup]: Handler<
      BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
    >;
  };

  type AllProps = UnionToIntersection<
    Parameters<PropGroups[keyof PropGroups]>[0]
  >;

  type ReturnedSystem = {
    groups: {
      [PropGroup in keyof BaseGroup]: Handler<
        BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
      >;
    };
    handlers: UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
    createVariant: <Variant extends Record<string, AllProps>>(
      config: Variant
    ) => (props: { variant: keyof Variant; theme: Theme }) => CSSObject;
  };

  return system as ReturnedSystem;
};
