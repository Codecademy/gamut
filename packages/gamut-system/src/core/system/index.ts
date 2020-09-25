import {
  AbstractTheme,
  ThematicConfig,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
  GetAltProps,
} from '../../types/system';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { registerHandler } from '../registerHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import { getDefaultPropKey } from '../utils';

type BasePropConfig = typeof BaseProps;

type GroupConfig<Theme extends AbstractTheme> = Record<
  string,
  ThematicConfig<Theme>
>;

type SystemConfig<Theme extends AbstractTheme> = Record<
  string,
  GroupConfig<Theme>
>;

export const createSystem = <Theme extends AbstractTheme>() => {
  return <Config extends SystemConfig<Theme>>(config: Config) => {
    // Defines the returned system shape of both single prop
    const system = {
      props: {},
      propGroups: {},
    } as any;

    // Merge the the default prop configurations and user defined ones together.
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
        const variantProps = config[props.variant] || {};
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
      props: {
        [PropGroup in keyof BaseGroup]: Handler<
          BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
        >;
      };
      propGroups: UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
      createVariant: <Variant extends Record<string, AllProps>>(
        config: Variant
      ) => (props: { variant: keyof Variant; theme?: Theme }) => CSSObject;
    };

    return system as ReturnedSystem;
  };
};
