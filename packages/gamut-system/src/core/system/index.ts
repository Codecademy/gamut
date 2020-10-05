import {
  AbstractTheme,
  PropertyConfig,
  Handler,
  UnionToIntersection,
  ThematicScaleValue,
  GetAltProps,
  ResponsiveProp,
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
  type MergedConfiguration = Config extends {}
    ? BaseConfig & Config
    : BaseConfig;

  // Intermediate type to derive return types from representing all properties and handler
  type BaseGroup = {
    /** All possible property handlers based off the MergedConfiguration  */
    [PropGroup in keyof MergedConfiguration]: {
      handlers: {
        [Property in keyof MergedConfiguration[PropGroup]]: Handler<
          Partial<
            Record<
              Property | GetAltProps<MergedConfiguration[PropGroup][Property]>,
              ResponsiveProp<
                ThematicScaleValue<
                  Theme,
                  MergedConfiguration[PropGroup][Property]
                >
              >
            >
          >
        >;
      };
      /** All possible prop type signatures  */
      props: {
        [Property in keyof MergedConfiguration[PropGroup]]: Partial<
          Record<
            Property | GetAltProps<MergedConfiguration[PropGroup][Property]>,
            ResponsiveProp<
              ThematicScaleValue<
                Theme,
                MergedConfiguration[PropGroup][Property]
              >
            >
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

  type VariantShape = Record<string, AllProps>;
  type VariantConfig = { key: string; variants: VariantShape };
  type VariantKey<
    T extends VariantShape | VariantConfig
  > = T extends VariantConfig ? T['key'] : 'variant';

  type System = {
    // Map of all propGroup handlers
    properties: UnionToIntersection<BaseGroup[keyof BaseGroup]['handlers']>;
    // createVariant with closure types
    variant: <Variants extends VariantConfig | VariantShape>(
      config: Variants
    ) => (
      props: Partial<
        Record<
          VariantKey<Variants>,
          Variants extends VariantShape
            ? keyof Variants
            : keyof Variants['variants']
        >
      > & {
        theme?: Theme;
      }
    ) => CSSObject;
  } & {
    [PropGroup in keyof BaseGroup]: Handler<
      BaseGroup[PropGroup]['props'][keyof BaseGroup[PropGroup]['props']]
    >;
  };

  // Initializes the return object
  const systemShape = {
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
    const propKey = config?.key ?? 'variant';
    // Collect the props the resulting variant function will be responsible for templating.
    const props = uniq(
      values(variants)
        .reduce((carry, variant) => carry.concat(keys(variant)), [] as any)
        .map((prop: string) => getDefaultPropKey(prop))
    );

    // Pick the correct handlers from the system (closure specific) and create a composite.
    const handlers = pick(systemShape.properties, props as any);
    const variantHandler = compose(...values(handlers));

    // Return the variant function
    return (props: any) => {
      const variantProps = variants[props[propKey]] || {};
      return variantHandler({ ...variantProps, theme: props.theme });
    };
  };

  // add the function to the returned object
  systemShape.variant = createVariant;

  return systemShape as System;
};
