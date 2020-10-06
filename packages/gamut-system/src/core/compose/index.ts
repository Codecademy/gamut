import {
  createResponsiveStyleTemplate,
  ResponsivePropertyArguments,
} from '../../styleTemplates';
import { AbstractTheme, Handler } from '../../types/system';

export const compose = <
  Props extends { theme?: AbstractTheme },
  Handlers extends Handler<Props>[]
>(
  ...handlers: Handlers
) => {
  // Mash the handlers into a Frankensteinian conglomeration of each of their prop names and style templates.
  const config = handlers.reduce<ResponsivePropertyArguments<Props>>(
    (accum, handler) => {
      return {
        propNames: [...accum.propNames, ...handler.propNames],
        styleTemplates: { ...accum.styleTemplates, ...handler.styleTemplates },
      };
    },
    {
      propNames: [],
      styleTemplates: {},
    }
  );

  // Ignore the original prop-to-style-template logic from each of the handlers;
  // instead, we create a new responsive property responsible for all of them.
  // We again make propNames and functions accessible for later composition.
  return Object.assign(createResponsiveStyleTemplate<Props>(config), config);
};
