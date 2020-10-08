import {
  AbstractTheme,
  PropertyConfig,
  Handler,
  ThematicProps,
} from '../../types/system';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { createHandler } from '../createHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import { getDefaultPropKey } from '../utils';
import { UnionToIntersection, WeakRecord } from '../../types/utils';

/** The Default Out of the Box Configuration */
type BaseConfig = typeof BaseProps;

/** A Group of Property Configurations EG: typography | spacing */
type GroupConfig<Theme extends AbstractTheme> = Record<
  string,
  PropertyConfig<Theme>
>;

/** All Groups / Properties */
type SystemConfig<Theme extends AbstractTheme> = Record<
  string,
  GroupConfig<Theme>
>;

// Initialize all type derivations and declare return signature
// Intersection of Base and the supplied configuration objects.
type MergeConfig<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = BaseConfig & Config;

// Intermediate type to derive return types from representing all properties and handler
type SystemProperties<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = {
  /** All possible property handlers based off the MergedConfiguration  */
  [PropGroup in keyof MergeConfig<Theme, Config>]: {
    handlers: {
      [Property in keyof MergeConfig<Theme, Config>[PropGroup]]: Handler<
        ThematicProps<Theme, MergeConfig<Theme, Config>[PropGroup][Property]>
      >;
    };
    /** All possible prop type signatures  */
    props: {
      [Property in keyof MergeConfig<Theme, Config>[PropGroup]]: ThematicProps<
        Theme,
        MergeConfig<Theme, Config>[PropGroup][Property]
      >;
    };
  };
};

// Intersection of all possible props
export type AllSystemProps<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = UnionToIntersection<
  {
    [PropGroup in keyof SystemProperties<Theme, Config>]: UnionToIntersection<
      SystemProperties<
        Theme,
        Config
      >[PropGroup]['props'][keyof SystemProperties<
        Theme,
        Config
      >[PropGroup]['props']]
    >;
  }[keyof SystemProperties<Theme, Config>]
>;

type System<Theme extends AbstractTheme, Config extends SystemConfig<Theme>> = {
  variant: {
    /** Customizable PropKey */
    <Prop extends Readonly<string>, Keys extends string>(config: {
      prop: Prop;
      variants: Readonly<Record<Keys, AllSystemProps<Theme, Config>>>;
    }): (props: WeakRecord<Prop, Keys> & { theme?: Theme }) => CSSObject;
    /**  */
    <Keys extends string>(
      config: Readonly<Record<Keys, AllSystemProps<Theme, Config>>>
    ): (props: WeakRecord<'variant', Keys> & { theme?: Theme }) => CSSObject;
  };
  properties: UnionToIntersection<
    SystemProperties<Theme, Config>[keyof SystemProperties<
      Theme,
      Config
    >]['handlers']
  >;
} & {
  [PropGroup in keyof SystemProperties<Theme, Config>]: Handler<
    SystemProperties<Theme, Config>[PropGroup]['props'][keyof SystemProperties<
      Theme,
      Config
    >[PropGroup]['props']]
  >;
};

export type ThemedSystem<Theme extends AbstractTheme> = <
  Config extends SystemConfig<Theme>
>(
  config?: Config
) => System<Theme, Config>;

export const system = <Config extends SystemConfig<{}>>(
  config: Config
): System<{}, Config> => {
  // Initializes the return object
  const systemShape = {
    properties: {},
  } as any;

  // Merge the the default prop configurations and user defined ones together.
  const propGroups = merge(BaseProps, config ?? {});

  // Iterate over all the property groups
  entries(propGroups).forEach(([groupKey, groupProps]) => {
    // Create the style functions (handlers) for each of the specifieed properties.
    const propHandlers = mapValues(groupProps, (prop) => createHandler(prop));

    // Create a composed group handler for the group (handles all group properties at once)
    const groupHandler = compose(...values(propHandlers));

    // Add them to the default props group.
    systemShape.properties = {
      ...systemShape.properties,
      ...propHandlers,
    };

    // Add the composite group handler to the correct propGroups key
    systemShape[groupKey] = groupHandler;
  });

  // Initialize the createVariant API inside the closure to ensure that we have access to all the possible handlers
  const createVariant = (config: any) => {
    const variants = config?.variants ?? config;
    const propKey = config?.prop ?? 'variant';
    // Collect the props the resulting variant function will be responsible for templating.
    const props = uniq(
      values(variants)
        .reduce((carry, variant) => carry.concat(keys(variant)), [])
        .map((prop: string) => getDefaultPropKey(prop))
    );

    // Pick the correct handlers from the system (closure specific) and create a composite.
    const handlers = pick(systemShape.properties, props as any);
    const variantHandler = compose(...(values(handlers) as any));

    // Return the variant function
    return (props: any) => {
      const variantProps = variants[props[propKey]] || {};
      return variantHandler({ ...variantProps, theme: props.theme });
    };
  };

  // add the function to the returned object
  systemShape.variant = createVariant;

  return systemShape;
};
