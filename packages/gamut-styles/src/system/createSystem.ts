import {
  AbstractTheme,
  ThematicConfig,
  ThematicProps,
  AbstractProps,
  Handler,
} from './types';
import { createHandler, compose } from './system';
import { get } from 'lodash';
import { typeMap } from './constants';

export const createSystem2 = <
  T extends AbstractTheme,
  C extends Record<string, ThematicConfig<T>>
>(
  theme: T,
  config: C
) => {
  const registerHandler = <K extends C[keyof C], P extends ThematicProps<T, K>>(
    config: K
  ) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<P, K>(propName, computeValue);
      const propConfig = {
        propName,
        altProps: get(config, 'altProps'),
        templateFn: styleFunction,
      };

      systemHandler = createHandler<P>(propConfig);
    } else {
      const composite: Handler<AbstractProps>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<P, K>(propKey, computeValue);
        const propConfig = {
          propName: propKey,
          templateFn: styleFunction,
        };
        const propHandler = createHandler<P>(propConfig);

        composite.push(propHandler as Handler<AbstractProps>);
      });

      systemHandler = compose(...composite);
    }

    return systemHandler as Handler<
      ThematicProps<T, Extract<K, { propName: typeof propName }>>
    >;
  };

  const configMap = {} as { [P in keyof C]: Handler<ThematicProps<T, C[P]>> };

  Object.keys(config).forEach((key: keyof C) => {
    configMap[key] = registerHandler(config[key]) as Handler<
      ThematicProps<T, C[typeof key]>
    >;
  });
  return configMap;
};
