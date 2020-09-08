import { ThematicConfig, ThematicProps } from './types';
import { standardStyle } from './style/standard';
import { createSystemHandler } from './templating/responsiveProp';
import { directional } from './style/directional';

const typeMap = {
  standard: standardStyle,
  directional: directional,
};

export const createSystem = <T extends { [key: string]: Readonly<unknown[]> }>(
  theme: T
) => {
  return <K extends ThematicConfig<T>>(config: K) => {
    const { type = 'standard' } = config;
    const templateFunction = typeMap[type];
    const handler = templateFunction<ThematicProps<T, K> & { theme?: T }, K>(
      config
    );
    return createSystemHandler(handler);
  };
};

export const registerHandler = createSystem({});
