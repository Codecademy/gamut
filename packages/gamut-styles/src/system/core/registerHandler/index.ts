import {
  ThematicConfig,
  AbstractTheme,
  ThematicProps,
  AbstractProps,
  Handler,
  HandlerConfig,
  StyleTemplate,
} from '../../types';
import { identity } from 'lodash';
import {
  standardProperty,
  directionalProperty,
  responsiveProperty,
} from '../../propTemplates';
import { compose } from '../compose';

const TEMPLATES = {
  standard: standardProperty,
  directional: directionalProperty,
};

export const createHandler = <T extends AbstractProps>({
  propName,
  altProps = [],
  templateFn,
}: HandlerConfig<T>): Handler<T> => {
  const propNames = [propName, ...altProps];
  const templateFns = {
    [propName]: templateFn,
  } as Partial<Record<keyof T, StyleTemplate<T>>>;

  const handler: Handler<T> = responsiveProperty<T>({ propNames, templateFns });

  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

export const registerHandler = <
  T extends AbstractTheme,
  C extends ThematicConfig<T>,
  P extends ThematicProps<T, C>
>(
  config: C
): Handler<P> => {
  const {
    propName,
    altProps = [],
    computeValue = identity,
    type = 'standard',
  } = config;
  const templateFunction = TEMPLATES[type];

  let systemHandler: Handler<P>;
  if (typeof propName === 'string') {
    const styleFunction = templateFunction<P, C>(propName, computeValue);
    const propConfig = {
      propName,
      altProps,
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
