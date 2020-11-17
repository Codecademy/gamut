import { mapValues } from 'lodash';
import * as system from '@codecademy/gamut-styles/src/system';

const { properties, variant, ...groups } = system;

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

export const argTypesEnhancers = [
  ({ parameters }) => {
    const { argTypes } = parameters;
    return mapValues(argTypes, (args) => {
      if (systemProps.includes(args.name)) {
        console.log(args);
        return args;
      }
      return args;
    });

    return parameters.argTypes;
  },
];
