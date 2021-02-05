import { entries, mapValues, merge, values } from 'lodash';

import * as BaseConfig from '../../props';
import { AbstractTheme } from '../../types/config';
import { System, SystemConfig } from '../../types/system';
import { compose } from '../compose';
import { createHandler } from '../createHandler';

const handlePseudoSelectors = (config: any = {}, styleFn: any) => {
  const base: any = {};
  const pseudo: any = {};

  Object.keys(config).forEach((key) => {
    if (key.indexOf('&') === 0) {
      pseudo[key] = config[key];
    } else {
      base[key] = config[key];
    }
  });

  return (props?: any) => {
    const theme = props?.theme ?? {};
    return {
      ...styleFn({ ...base, theme }),
      ...mapValues(pseudo, (styles) => styleFn({ ...styles, theme })),
    };
  };
};

const create = <
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
>(
  config?: Config
): System<Theme, Config> => {
  // Initializes the return object
  const system = {
    properties: {},
  } as any;

  // Merge the the default prop configurations and user defined ones together.
  const propGroups = merge(BaseConfig, config || {});

  // Iterate over all the property groups
  entries(propGroups).forEach(([groupKey, groupProps]) => {
    // Create the style functions (handlers) for each of the specifieed properties.
    const propHandlers = mapValues(groupProps, createHandler);

    // Create a composed group handler for the group (handles all group properties at once)
    const groupHandler = compose(...values(propHandlers));

    // Add them to the default props group.
    system.properties = {
      ...system.properties,
      ...propHandlers,
    };

    // Add the composite group handler to the correct propGroups key
    system[groupKey] = groupHandler;
  });

  const allSystemProps = compose(...(values(system.properties) as any));

  // Initialize the createVariant API inside the closure to ensure that we have access to all the possible handlers
  const createVariant = (config: any) => {
    const variants = config?.variants || config;
    const propKey = config?.prop || 'variant';

    // Return the variant function
    return (props: any) => {
      const variantProps = variants[props[propKey]];
      return handlePseudoSelectors(variantProps, allSystemProps)(props);
    };
  };

  // add the function to the returned object
  system.variant = createVariant;

  return {
    ...system,
    css: (config: any) => handlePseudoSelectors(config, allSystemProps),
    variant: createVariant,
  };
};

export const system = {
  create: <Config extends SystemConfig<{}>>(config: Config) => {
    return create<{}, Config>(config);
  },
  withTheme: <Theme extends AbstractTheme>() => {
    return {
      create: <Config extends SystemConfig<Theme>>(config: Config) => {
        return create<Theme, Config>(config);
      },
    };
  },
};
