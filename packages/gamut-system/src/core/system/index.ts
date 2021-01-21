import { mapValues, merge, pick, values } from 'lodash';

import { AllProps, Groups } from '../../props';
import { AbstractTheme } from '../../types/config';
import { System, SystemConfig } from '../../types/system';
import { compose } from '../compose';
import { createHandler } from '../createHandler';

const handlePseudoSelectors = (config: any, styleFn: any) => {
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
  // Merge the the default prop configurations and user defined ones together.
  const properties = merge(AllProps, config || {});
  // Initializes the return object
  const system = {
    properties: mapValues(properties, createHandler),
    groups: mapValues(Groups, (config) =>
      compose(...values(pick(system.properties, Object.keys(config))))
    ),
  } as any;

  // Iterate over all the property groups

  const allSystemProps = compose(...(values(system.properties) as any));

  return {
    ...system,
    css: (config: any) => handlePseudoSelectors(config, allSystemProps),
    variant: (config: any) => {
      const variants = config?.variants || config;
      const propKey = config?.prop || 'variant';

      // Return the variant function
      return (props: any) => {
        const variantProps = variants[props[propKey]] || {};
        return handlePseudoSelectors(variantProps, allSystemProps)(props);
      };
    },
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
