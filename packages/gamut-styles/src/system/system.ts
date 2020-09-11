import { AbstractTheme, ThematicConfig, ThematicProps, Handler } from './types';
import { registerHandler } from './registerHandler';

export const system = <
  T extends AbstractTheme,
  C extends Record<string, ThematicConfig<T>>
>(
  config: C,
  theme?: T
) => {
  const configMap = {} as {
    [P in keyof typeof config]: Handler<ThematicProps<T, C[P]>>;
  };

  for (const key in config) {
    const handler = registerHandler(config[key]);

    configMap[key] = handler;
  }

  return configMap;
};
