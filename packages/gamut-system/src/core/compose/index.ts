import { createResponsiveStyleTemplate } from '../../styleTemplates';
import { AbstractProps, Handler, StyleTemplate } from '../../types/system';
import { UnionToIntersection } from '../../types/utils';

export const compose = <
  Handlers extends Handler<AbstractProps>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
) => {
  // Initialize the new composites arguments
  const config = {
    propNames: [],
    styleTemplates: {},
  } as {
    propNames: (keyof Parameters<Handlers[number]>[0])[];
    styleTemplates: Partial<Record<keyof Props, StyleTemplate<Props>>>;
  };

  // Add each handlers respective propNames and styleTemplates to the new composite
  handlers.forEach((handler) => {
    if (handler.propNames) {
      config.propNames = [...config.propNames, ...handler.propNames];
    }
    if (handler.styleTemplates) {
      config.styleTemplates = {
        ...config.styleTemplates,
        ...handler.styleTemplates,
      };
    }
  });

  // Create a new responsive property responsible for templating all the single handlers
  // Make the handlers propNames and functions accessible on the function reference
  return Object.assign(createResponsiveStyleTemplate<Props>(config), config);
};
