import {
  AbstractProps,
  Handler,
  UnionToIntersection,
  StyleTemplate,
} from '../../types';
import { responsiveProperty } from '../../propTemplates';

export const compose = <
  T extends Handler<AbstractProps>[],
  P extends Partial<UnionToIntersection<Parameters<T[number]>[0]>>
>(
  ...handlers: T
) => {
  let propNames: (keyof Parameters<T[number]>[0])[] = [];
  let templateFns = {} as Partial<Record<keyof P, StyleTemplate<P>>>;

  handlers.forEach((handler) => {
    if (handler.propNames) {
      propNames = propNames.concat(handler.propNames);
    }
    if (handler.templateFns) {
      templateFns = { ...templateFns, ...handler.templateFns };
    }
  });

  const config = {
    propNames,
    templateFns,
  };

  const composedHandler: Handler<P> = responsiveProperty<P>(config);

  composedHandler.propNames = propNames;
  composedHandler.templateFns = templateFns;

  return composedHandler;
};
