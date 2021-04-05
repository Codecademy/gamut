import { mapValues, isNumber, map } from 'lodash/fp';
import { ArgTypesEnhancer } from '@storybook/client-api';
import { kebabCase, merge } from 'lodash';
import { ALL_PROPS, PROP_META, PROP_GROUPS } from './propMeta';
import { theme } from '@codecademy/gamut-styles/src/theme';

export type SystemControls =
  | 'text'
  | 'select'
  | 'radio'
  | 'inline-radio'
  | 'object';

export type ControlType = {
  type: SystemControls;
  options?: unknown[];
};

const MDN_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS/';
const THEME_PATH = '/?path=/docs/foundations-theme';

const baseProps = {
  as: {
    description: 'Change the element this component uses',
    category: 'base',
  },
  theme: {
    description: `[Emotion Theme](${THEME_PATH}--page)`,
    category: 'base',
    control: {
      disable: true,
    },
  },
};

const createSystemArgType = ({ description, category, control, options }) => ({
  description,
  options,
  table: {
    category,
  },
  control,
});

const createDescription = (name: string) => {
  const description: string[] = [];
  const cssProp = kebabCase(name);
  description.push(`Property: [${cssProp}](${MDN_URL}${cssProp})`);

  const scale = PROP_META?.[name]?.scale;

  if (scale) {
    description.push(`Scale: [${scale}](${THEME_PATH}--${kebabCase(scale)})`);
  }

  return description.join('<br />');
};

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
    Object.entries(PROP_GROUPS).find(([key, { propNames = [] }]) =>
      propNames.includes(name)
    ) || [];
  return groupName;
};

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;
  const parsedOptions: Record<string, any> = {};

  return mapValues((arg) => {
    if (baseProps[arg.name]) {
      return merge({}, arg, createSystemArgType(baseProps[arg.name]));
    }

    // Find all system props that do not have a description
    if (ALL_PROPS.includes(arg.name) && arg.description === '') {
      const { name } = arg;
      let control: ControlType;
      let options;
      const scaleKey = PROP_META?.[name]?.scale;
      const scale = theme?.[scaleKey];

      if (scale) {
        // if we have a defined set of options create a specific config for the options
        parsedOptions[scaleKey] =
          parsedOptions[scaleKey] ?? Object.keys(scale).sort();
        const argOptions = parsedOptions[scaleKey];

        options = argOptions;

        control = {
          type: getControlType(argOptions),
        };
      } else {
        // Use JSON editor for anything without options
        control = { type: 'object' };
      }

      return merge(
        arg,
        createSystemArgType({
          description: createDescription(arg.name),
          category: getPropCategory(arg.name),
          options: options,
          control,
        })
      );
    }
    return arg;
  }, argTypes);
};

export const argTypesEnhancers = [formatSystemProps];
