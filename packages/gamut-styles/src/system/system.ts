import { ThematicConfig, ThematicProps, Handler } from './types';
import { standardStyle } from './style/standard';
import {
  createSystemHandler,
  composeSystem,
} from './templating/responsiveProp';
import { directional } from './style/directional';

const typeMap = {
  standard: standardStyle,
  directional: directional,
};

export const createSystem = <T extends { [key: string]: Readonly<unknown[]> }>(
  theme: T
) => {
  return <K extends ThematicConfig<T>>(config: K) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<ThematicProps<T, K>, K>(
        propName,
        computeValue
      );
      systemHandler = createSystemHandler(styleFunction);
    } else {
      const composite: Handler<{}>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<ThematicProps<T, K>, K>(
          propKey,
          computeValue
        );
        const propHandler = createSystemHandler(styleFunction);

        composite.push(propHandler);
      });

      systemHandler = composeSystem(...composite);
    }

    return systemHandler;
  };
};

export const registerHandler = createSystem({});
