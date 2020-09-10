import {
  ThematicConfig,
  ThematicProps,
  Handler,
  AbstractTheme,
  StyleTemplate,
  AbstractProps,
} from './types';

import { directional, responsiveProperty, standard } from './templateStyles';
import { get } from 'lodash';

const typeMap = {
  standard: standard,
  directional: directional,
};

type HandlerConfig<T extends AbstractProps> = {
  propName: keyof T;
  altProps?: (keyof T)[];
  templateFn: StyleTemplate<T>;
};

export function createHandler<T extends AbstractProps>({
  propName,
  altProps = [],
  templateFn,
}: HandlerConfig<T>): Handler<T> {
  const propNames = [propName, ...altProps];
  const templateFns = {
    [propName]: templateFn,
  } as Partial<Record<keyof T, StyleTemplate<T>>>;

  const handler: Handler<T> = responsiveProperty<T>({ propNames, templateFns });
  handler.propNames = propNames;
  handler.templateFns = templateFns;
  return handler;
}

export function compose<T extends Record<string, unknown>>(
  ...handlers: Handler<T>[]
) {
  let propNames: (keyof T)[] = [];
  let templateFns = {} as Partial<Record<keyof T, StyleTemplate<T>>>;

  handlers.forEach((handler) => {
    if (handler.propNames) {
      propNames = propNames.concat(handler.propNames);
    }
    if (handler.templateFns) {
      templateFns = { ...templateFns, ...handler.templateFns };
    }
  });

  const composedHandler: Handler<T> = responsiveProperty<T>({
    propNames,
    templateFns,
  });

  composedHandler.propNames = propNames;
  composedHandler.templateFns = templateFns;

  return composedHandler;
}

export const createSystem = <T extends AbstractTheme>(theme: T) => {
  return <K extends ThematicConfig<T>, P extends ThematicProps<T, K>>(
    config: K
  ) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<P, K>(propName, computeValue);

      systemHandler = createHandler<P>({
        propName,
        altProps: get(config, 'altProps'),
        templateFn: styleFunction,
      });
    } else {
      const composite: Handler<P>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<P, K>(propKey, computeValue);

        const propHandler = createHandler<P>({
          propName: propKey,
          templateFn: styleFunction,
        });

        composite.push(propHandler);
      });

      systemHandler = compose<P>(...composite);
    }

    return systemHandler;
  };
};

export const registerHandler = createSystem({});
