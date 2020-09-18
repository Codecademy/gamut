import {
  AbstractTheme,
  ThematicPropConfig,
  ThematicProps,
  Handler,
  AbstractProps,
} from '../../types';
import { compose } from '../compose';
import { registerHandler } from '../registerHandler';

export const createSystem = <
  T extends AbstractTheme,
  C extends Record<string, Record<string, ThematicPropConfig<T>>>
>(
  config: C,
  theme?: T
) => {
  const configMap = {} as {
    [P in keyof C]: {
      handlers: {
        [D in keyof C[P]]: Handler<ThematicProps<T, C[P][D]>>;
      };
      composed: Handler<ThematicProps<T, C[P][keyof C[P]]>>;
    };
  };

  for (const key in config) {
    const handlers = [] as Handler<Partial<AbstractProps>>[];
    for (const prop in config[key]) {
      const handler = registerHandler(config[key][prop]);
      configMap[key].handlers[prop] = handler;
      handlers.push(handler as Handler<Partial<AbstractProps>>);
    }
    configMap[key].composed = compose(...handlers);
  }

  return configMap;
};
