import React from 'react';
import { mapValues, update, isNumber, compose, get, set, map } from 'lodash/fp';
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

const parseScaleValue = update('table.type.summary', (summary) => {
  if (summary.length) {
    return sortScale(getScale(summary).split(' | ')).join(' | ');
  }
  return summary;
});

const updateDescription = update('description', (desc) => DOCS_LINK);

const updateControl = (arg) => {
  const summary = get('table.type.summary', arg);
  const options = sortScale(summary.split(' | '));
  if (summary.indexOf('string') > -1) {
    return set('control', { type: 'text' }, arg);
  } else {
    return set(
      'control',
      {
        type: 'select',
        options: map(
          (val) => (typeof val === 'string' ? val.replace(/"/g, '') : val),
          options
        ),
      },
      arg
    );
  }
};

const updateCategory = (arg) => {
  const group = Object.entries(groups).find(([key, { propNames }]) =>
    propNames.includes(arg.name)
  )[0];

  return set('table.category', group, arg);
};

const enrichArg = compose(
  updateCategory,
  updateControl,
  updateDescription,
  parseScaleValue
);

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;
  return mapValues((args) => {
    if (args.name === 'theme') {
      return {
        ...args,
        description: 'Codecademy Theme',
        control: {
          ...args.control,
          disable: true,
        },
      };
    }
    if (systemProps.includes(args.name) && args.description === '') {
      return enrichArg(args);
    }
    return args;
  }, argTypes);
};

export const argTypesEnhancers = [formatSystemProps];
