import {
  AbstractTheme,
  ThematicConfig,
  ThematicProps,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
  AbstractSystemConfig,
} from '../../types';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { registerHandler } from '../registerHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import { Props as PropDefaults } from '../../types/props';

type BasePropConfig = typeof BaseProps;

type GetAltProps<Config extends AbstractSystemConfig> = Extract<
  PropDefaults[Config['propName']],
  { altProps: string }
>['altProps'];

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
      values(config).reduce(
        (carry, variant) => carry.concat(keys(variant)),
        [] as any
      )
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
        [Property in keyof Merged[PropGroup]]: ThematicScaleValue<
          Theme,
          Merged[PropGroup][Property]
        >;
      };
      altProps: {
        [Property in keyof Merged[PropGroup]]: Record<
          GetAltProps<Merged[PropGroup][Property]>,
          ThematicScaleValue<Theme, Merged[PropGroup][Property]>
        >;
      };
    };
  };

  type Props = UnionToIntersection<
    | BaseGroup[keyof BaseGroup]['props']
    | BaseGroup[keyof BaseGroup]['altProps'][keyof BaseGroup[keyof BaseGroup]['altProps']]
  >;

  type ReturnedSystem = {
    groups: {
      [PropGroup in keyof BaseGroup]: Handler<
        Partial<
          BaseGroup[PropGroup]['props'] &
            UnionToIntersection<
              BaseGroup[PropGroup]['altProps'][keyof BaseGroup[PropGroup]['altProps']]
            >
        >
      >;
    };
    handlers: UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
    createVariant: <Variant extends Record<string, Partial<Props>>>(
      config: Variant
    ) => (props: { variant: keyof Variant; theme: Theme }) => CSSObject;
  };

  return system as ReturnedSystem;
};
