import { AbstractTheme } from '../../types/config';
import * as BASE_CONFIG from '../../props';
import { compose } from '../compose';
import { createHandler } from '../createHandler';
import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import { getDefaultPropKey } from '../utils';
import { System, SystemConfig } from '../../types/system';

export type ThemedSystem<Theme extends AbstractTheme> = <
  Config extends SystemConfig<Theme>
>(
  config: Config
) => System<Theme, Config>;

export const system = <Config extends SystemConfig<{}>>(
  config: Config
): System<{}, Config> => {
  // Initializes the return object
  const systemShape = {
    properties: {},
  } as any;

  // Merge the the default prop configurations and user defined ones together.
  const propGroups = merge(BASE_CONFIG, config ?? {});

  // Iterate over all the property groups
  entries(propGroups).forEach(([groupKey, groupProps]) => {
    // Create the style functions (handlers) for each of the specifieed properties.
    const propHandlers = mapValues(groupProps, createHandler);

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
