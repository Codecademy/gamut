import {
  AbstractProps,
  Handler,
  UnionToIntersection,
  StyleTemplate,
  AbstractTheme,
} from '../../types/system';
import { responsiveProperty } from '../../propTemplates';

export const compose = <
  Handlers extends Handler<AbstractProps>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
) => {
  // Initialize the new composites arguments
  const config = {
    propNames: [],
    templateFns: {},
  } as {
    propNames: (keyof Parameters<Handlers[number]>[0])[];
    templateFns: Partial<Record<keyof Props, StyleTemplate<Props>>>;
  };

  // Add each handlers respective propNames and templateFns to the new composite
  handlers.forEach((handler) => {
    if (handler.propNames) {
      config.propNames = [...config.propNames, ...handler.propNames];
    }
    if (handler.templateFns) {
      config.templateFns = { ...config.templateFns, ...handler.templateFns };
    }
  });

  // Create a new responsive property responsible for templating all the single handlers
  const composedHandler: Handler<Props> = responsiveProperty<
    AbstractTheme,
    Props
  >(config);

  // Make the handlers propNames and functions accessible on the function reference
  composedHandler.propNames = config.propNames;
  composedHandler.templateFns = config.templateFns;

  return composedHandler;
};
