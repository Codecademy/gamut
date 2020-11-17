import { mapValues, update, isNumber } from 'lodash/fp';
import { ArgTypesEnhancer } from '@storybook/client-api';
import * as system from '@codecademy/gamut-styles/src/system';

const { properties, variant, ...groups } = system;

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;
  return mapValues((args) => {
    if (systemProps.includes(args.name) && args.description === '') {
      return update(
        'table.type.summary',
        (summary) => {
          if (summary.length) {
            const parsedScale = summary.split('| Media')[0];
            let scale = parsedScale.split(' | ');
            const numericScale =
              isNumber(parseInt(scale[0])) && !isNaN(parseInt(scale[0]));
            if (numericScale) {
              scale = scale
                .map((val) => parseInt(val))
                .sort((a, b) => (a > b ? 1 : -1));
            }
            return scale.join(' | ');
          }
          return summary;
        },
        args
      );
    }
    return args;
  }, argTypes);
};

export const argTypesEnhancers = [formatSystemProps];
