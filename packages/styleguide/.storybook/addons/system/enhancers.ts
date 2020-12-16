import { mapValues, isNumber, get, map } from 'lodash/fp';
import { ArgTypesEnhancer } from '@storybook/client-api';
import * as system from '@codecademy/gamut-styles/src/system';

const DOCS_LINK =
  'Responsive Property [spec](https://github.com/Codecademy/client-modules/blob/main/packages/gamut-system/docs/responsive.md)';

const { properties, variant, ...groups } = system;

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

const getScale = (value: string) => {
  const [match, scale] = value.match(/<(.*?)>/) ?? [];
  return scale ?? value;
};

const sortScale = (scale: string[]) => {
  const numericScale =
    isNumber(parseInt(scale[0])) && !isNaN(parseInt(scale[0]));
  if (numericScale) {
    return scale.map((val) => parseInt(val)).sort((a, b) => (a > b ? 1 : -1));
  }
  return scale;
};

const sanitizeOptions = map((val) =>
  typeof val === 'string' ? val.replace(/"/g, '') : val
);

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;
  return mapValues((arg) => {
    // Update theme props
    if (arg.name === 'theme' && arg.table.type.summary.indexOf('Theme') > -1) {
      return {
        ...arg,
        table: {
          ...arg.table,
          category: 'base',
        },
        description: 'Codecademy Theme',
        control: {
          ...arg.control,
          disable: true,
        },
      };
    }

    // For as props we want to provide a standard description
    if (arg.name === 'as') {
      const summary = get('table.type.summary', arg);
      const options = sortScale(summary.split(' | '));

      return {
        ...arg,
        description:
          'Configures what element tag this component should present as',
        table: {
          ...arg.table,
          category: 'base',
        },
        control: {
          ...arg.control,
          type: 'select',
          options: sanitizeOptions(options),
        },
      };
    }

    // Find all system props that do not have a description
    if (systemProps.includes(arg.name) && arg.description === '') {
      const category = Object.entries(groups).find(([key, { propNames }]) =>
        propNames.includes(arg.name)
      )[0];
      const rawScale = arg?.table?.type?.summary;
      const options = rawScale && sortScale(getScale(rawScale).split(' | '));
      const parsedScale = options.join(' | ');

      let control: {
        type: 'text' | 'select';
        options?: unknown[];
      } = {
        type: 'select',
        options: sanitizeOptions(options),
      };

      if (rawScale.indexOf('string') > -1 || options.length < 2) {
        control = { type: 'text' };
      }

      return {
        ...arg,
        description: DOCS_LINK,
        table: {
          ...arg.table,
          category,
          type: {
            ...arg?.table?.type,
            summary: parsedScale || rawScale,
          },
        },
        control,
      };
    }
    return arg;
  }, argTypes);
};

export const argTypesEnhancers = [formatSystemProps];
