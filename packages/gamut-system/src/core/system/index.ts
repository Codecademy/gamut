import {
  AbstractTheme,
  PropertyConfig,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
  GetAltProps,
} from '../../types/system';
import * as BaseProps from '../../props';
import { compose } from '../compose';
import { createHandler } from '../createHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import { getDefaultPropKey } from '../utils';

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

export const system = <
  Config extends SystemConfig<Theme>,
  Theme extends AbstractTheme
>(
  config?: Config
) => {
  // Initialize all type derivations and declare return signature
  // Intersection of Base and the supplied configuration objects.
  type SystemConfig = typeof config extends Config
    ? BaseConfig & Config
    : BaseConfig;

  // Intermediate type to derive return types from representing all properties and handler
  type BaseGroup = {
    /** All possible property handlers based off the SystemConfig  */
    [PropGroup in keyof SystemConfig]: {
      handlers: {
        [Property in keyof SystemConfig[PropGroup]]: Handler<
          Partial<
            Record<
              Property | GetAltProps<SystemConfig[PropGroup][Property]>,
              ThematicScaleValue<Theme, SystemConfig[PropGroup][Property]>
            >
          >
        >;
      };
      /** All possible prop type signatures  */
      props: {
        [Property in keyof SystemConfig[PropGroup]]: Partial<
          Record<
            Property | GetAltProps<SystemConfig[PropGroup][Property]>,
            ThematicScaleValue<Theme, SystemConfig[PropGroup][Property]>
          >
        >;
      };
    };
  };

  // Return type for composed propGroup handlers
  type PropGroups = {
    [PropGroup in keyof BaseGroup]: Handler<
      BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
    >;
  };

  // Intersection of all possible props
  type AllProps = UnionToIntersection<
    Parameters<PropGroups[keyof PropGroups]>[0]
  >;

  type System = {
    // Map of all prop handlers
    properties: {
      [PropGroup in keyof BaseGroup]: Handler<
        BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
      >;
    };
    // Map of all propGroup handlers
    propertyGroups: UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
    // createVariant with closure types
    variant: <
      Variant extends { key?: string; variants: Record<string, AllProps> },
      PropKey extends Variant['key'] extends string ? Variant['key'] : 'variant'
    >(
      config: Variant
    ) => (
      props: Record<PropKey, keyof Variant['variants']> & {
        theme?: Theme;
      }
    ) => CSSObject;
  };

  // Initializes the return object
  const system = {
    properties: {},
    propertyGroups: {},
  } as any;

  // Merge the the default prop configurations and user defined ones together.
  const propGroups = merge(BaseProps, config ?? {}) as any;

  // Iterate over all the property groups
  entries(propGroups).forEach(([groupKey, groupProps]) => {
    // Create the style functions (handlers) for each of the specifieed properties.
    const propHandlers = mapValues(groupProps as any, (prop) =>
      createHandler(prop)
    );

    // Create a composed group handler for the group (handles all group properties at once)
    const groupHandler = compose(...values(propHandlers));

    // Add them to the default props group.
    system.properties = {
      ...system.properties,
      ...propHandlers,
    };

    // Add the composite group handler to the correct propGroups key
    system.propertyGroups[groupKey] = groupHandler;
  });

  // Initialize the createVariant API inside the closure to ensure that we have access to all the possible handlers
  const createVariant = (config: any) => {
    // Collect the props the resulting variant function will be responsible for templating.
    const props = uniq(
      values(config)
        .reduce((carry, variant) => carry.concat(keys(variant)), [] as any)
        .map((prop: string) => getDefaultPropKey(prop))
    );

    // Pick the correct handlers from the system (closure specific) and create a composite.
    const handlers = pick(system.handlers, props as any);
    const variantHandler = compose(...values(handlers));

    // Return the variant function
    return (props: { variant: any; theme: Theme }) => {
      const variantProps = config[props.variant] || {};
      return variantHandler({ ...variantProps, theme: props.theme });
    };
  };

  // add the function to the returned object
  system.variant = createVariant;

  return system as System;
};
