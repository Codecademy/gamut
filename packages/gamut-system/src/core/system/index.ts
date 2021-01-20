import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';

import * as BaseConfig from '../../props';
import { AbstractTheme } from '../../types/config';
import { System, SystemConfig } from '../../types/system';
import { compose } from '../compose';
import { createHandler } from '../createHandler';
import { getDefaultPropKey } from '../utils';

const handlePseudoSelectors = (config: any, styleFn: any) => {
  const base: any = {};
  const pseudoGroups: any = {};

  Object.keys(config).forEach((key) => {
    if (key.indexOf('&') === 0) {
      pseudoGroups[key] = config[key];
    } else {
      base[key] = config[key];
    }
  });

  return ({ theme }: any) => ({
    ...styleFn({ ...base, theme }),
    ...mapValues(pseudoGroups, (pseudoStyles) =>
      styleFn({ ...pseudoStyles, theme })
    ),
  });
};

const create = <
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
>(
  config?: Config
): System<Theme, Config> => {
  // Initializes the return object
  const systemShape = {
    properties: {},
    groups: {},
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
    systemShape.properties = {
      ...systemShape.properties,
      ...propHandlers,
    };

    // Add the composite group handler to the correct propGroups key
    systemShape.groups[groupKey] = groupHandler;
  });

  // Initialize the createVariant API inside the closure to ensure that we have access to all the possible handlers
  const createVariant = (config: any) => {
    const variants = config?.variants || config;
    const propKey = config?.prop || 'variant';
    // Collect the props the resulting variant function will be responsible for templating.
    const props = uniq(
      values(variants)
        .reduce((carry, variant) => {
          let props = [...carry];
          const variantStyles = keys(variant);
          variantStyles.forEach((prop) => {
            if (prop.indexOf('&') === 0) {
              props = [...props, ...keys(variant[prop])];
            } else {
              props.push(prop);
            }
          });

          return props;
        }, [])
        .map((prop: string) => getDefaultPropKey(prop))
    );
    // Pick the correct handlers from the system (closure specific) and create a composite.
    const handlers = pick(systemShape.properties, props as any);

    const variantHandler = compose(...(values(handlers) as any));

    // Return the variant function
    return (props: any) => {
      const variantProps = variants[props[propKey]] || {};
      return handlePseudoSelectors(variantProps, variantHandler)(props);
    };
  };

  // add the function to the returned object
  systemShape.variant = createVariant;

  const allProps = compose(...(values(systemShape.properties) as any));

  const css = (config: any) => handlePseudoSelectors(config, allProps);

  systemShape.css = css;

  return systemShape;
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
