import { ThematicConfig, ThematicProps, Handler, AbstractTheme } from './types';

import { directional, responsiveProperty, standard } from './templateStyles';
import { css } from '@emotion/core';

const typeMap = {
  standard: standard,
  directional: directional,
};

export function createHandler<T>(handler: Handler<T>): Handler<T> {
  const responsiveHandler = responsiveProperty<T>(handler);
  return (props, noMedia = false) =>
    noMedia ? handler(props) : responsiveHandler(props);
}

export function compose<T>(...handlers: Handler<T>[]) {
  return responsiveProperty<T>(
    (props: T) =>
      css`
        ${handlers.map((handler) => handler(props, true))}
      `
  );
}

export const createSystem = <T extends AbstractTheme>(theme: T) => {
  return <K extends ThematicConfig<T>>(config: K) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<ThematicProps<T, K>, K>(
        propName,
        computeValue
      );
      systemHandler = createHandler(styleFunction);
    } else {
      const composite: Handler<{}>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<ThematicProps<T, K>, K>(
          propKey,
          computeValue
        );
        const propHandler = createHandler(styleFunction);

        composite.push(propHandler);
      });

      systemHandler = compose(...composite);
    }

    return systemHandler;
  };
};

export const registerHandler = createSystem({});
