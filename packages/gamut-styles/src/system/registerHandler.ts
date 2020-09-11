import {
  ThematicConfig,
  AbstractTheme,
  ThematicProps,
  AbstractProps,
  Handler,
} from './types';
import { identity, get } from 'lodash';
import { typeMap } from './constants';
import { createHandler } from './createHandler';
import { compose } from './compose';

export const registerHandler = <
  T extends AbstractTheme,
  C extends ThematicConfig<T>,
  P extends ThematicProps<T, C>
>(
  config: C
): Handler<P> => {
  const { propName, computeValue = identity, type = 'standard' } = config;

  const templateFunction = typeMap[type];
  let systemHandler: Handler<P>;

  if (typeof propName === 'string') {
    const styleFunction = templateFunction<P, C>(propName, computeValue);
    const propConfig = {
      propName,
      altProps: get(config, 'altProps'),
      templateFn: styleFunction,
    };

    systemHandler = createHandler<P>(propConfig);
  } else {
    const composite: Handler<AbstractProps>[] = [];
    propName.forEach((propKey) => {
      const styleFunction = templateFunction<P, C>(propKey, computeValue);
      const propConfig = {
        propName: propKey,
        templateFn: styleFunction,
      };
      const propHandler = createHandler<P>(propConfig);

      composite.push(propHandler as Handler<AbstractProps>);
    });

    systemHandler = compose(...composite);
  }

  return systemHandler;
};
