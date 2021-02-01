import { mapValues, isNumber, map } from 'lodash/fp';
import { ArgTypesEnhancer } from '@storybook/client-api';
import { kebabCase } from 'lodash';
import { ALL_PROPS, PROP_META, PROP_GROUPS } from './propMeta';
import { Theme, theme } from '@codecademy/gamut-styles/src/theme';

export type SystemControls = 'text' | 'select' | 'radio' | 'inline-radio';

export type ControlType = {
  type: SystemControls;
  options?: unknown[];
};

const MDN_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS/';
const THEME_PATH = '/?path=/docs/foundations-theme';

const createDescription = (name: string) => {
  const description: string[] = [];
  const cssProp = kebabCase(name);
  description.push(`Property: [${cssProp}](${MDN_URL}${cssProp})`);

  const scale = PROP_META?.[name as keyof typeof PROP_META]?.scale;

  if (scale) {
    description.push(`Scale: [${scale}](${THEME_PATH}--${kebabCase(scale)})`);
  }

  return description.join('<br />');
};

const getScale = (value: string) => {
  const [, scale] = value.match(/<(.*?)>/) ?? [];
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

const getControlType = (args: unknown[]): SystemControls => {
  const selections = args.length;
  if (selections > 4) {
    return 'select';
  }
  if (selections > 2) {
    return 'radio';
  }
  return 'inline-radio';
};

const getPropCategory = (name: string) => {
  const [groupName] =
    Object.entries(PROP_GROUPS).find(([key, { propNames }]) =>
      propNames.includes(name)
    ) || [];
  return groupName;
};

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;

  return mapValues((arg) => {
    // Update theme props
    if (
      arg.name === 'theme' &&
      arg?.table?.type?.summary.indexOf('Theme') > -1
    ) {
      const description = `[Emotion Theme](${THEME_PATH}--page)`;

      return {
        ...arg,
        description,
        table: {
          ...arg.table,
          category: 'base',
        },
        control: {
          disable: true,
        },
      };
    }

    // For as props we want to provide a standard description
    if (arg.name === 'as') {
      const summary = arg?.table?.type?.summary ?? '';
      const options = sortScale(summary.split(' | '));
      const description = 'Change the element this component uses';

      return {
        ...arg,
        description,
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
    if (ALL_PROPS.includes(arg.name) && arg.description === '') {
      const { name } = arg;
      const control: ControlType = { type: 'text' };

      const rawScale = arg?.table?.type?.summary ?? '';
      const options = rawScale && sortScale(getScale(rawScale).split(' | '));

      const isStringControl =
        rawScale.indexOf('string') > -1 || options.length < 2;

      if (!isStringControl) {
        const scaleKey = PROP_META?.[name as keyof typeof PROP_META]
          ?.scale as keyof Theme;
        const scale = theme?.[scaleKey];
        const argOptions = scale
          ? Object.keys(scale)
          : sanitizeOptions(options);

        control.type = getControlType(argOptions);
        control.options = argOptions;
      }

      return {
        ...arg,
        description: createDescription(name),
        table: {
          ...arg.table,
          category: getPropCategory(name),
          type: {
            ...arg?.table?.type,
            summary: options.join(' | ') || rawScale,
          },
        },
        control,
      };
    }
    return arg;
  }, argTypes);
};

export const argTypesEnhancers = [formatSystemProps];
