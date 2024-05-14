import mapValues from 'lodash/fp/mapValues';
import { ArgTypesEnhancer } from '@storybook/client-api';
import hasIn from 'lodash/hasIn';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import kebabCase from 'lodash/kebabCase';
import merge from 'lodash/merge';
import { ALL_PROPS, PROP_MAP, PROP_GROUPS } from './propMeta';
import { theme } from '@codecademy/gamut-styles';

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
    control: {
      type: 'text',
    },
  },
  theme: {
    description: `<u>[Emotion Theme](${THEME_PATH}--colors)</u> <br /> This prop is set automatically and indicates that it is a consumer of the Theme context. Do not pass anything to it.`,
    category: 'base',
    control: {
      disable: true,
    },
  },
};

type AbstractArgType = {
  name: string;
  description: string;
  category: string;
  options: any;
  control: any;
};

const createSystemArgType = ({
  description,
  category,
  control,
  options,
}: Partial<AbstractArgType>) => ({
  description,
  options,
  table: {
    category,
    type: {
      summary: null,
    },
  },
  control,
});

const createDescription = (name: string) => {
  const description: string[] = [];
  const { property, properties = [property] } = PROP_MAP[name];
  const cssProps = properties
    .map(kebabCase)
    .map((cssProp) => ` [${cssProp}](${MDN_URL}${cssProp})`)
    .join(', ');

  description.push(`**Property**: ${cssProps}`);
  const { scale, transform } = PROP_MAP?.[name];

  if (isString(scale)) {
    description.push(
      `**Scale**: [${scale}](${THEME_PATH}--${kebabCase(scale)})`
    );
  }

  if (transform) {
    description.push(`**Transform**: ${transform.name}`);
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
  const [groupName = 'base'] =
    Object.entries(PROP_GROUPS).find(([key, { propNames = [] }]) =>
      propNames.includes(name)
    ) || [];
  return groupName;
};

const formatSystemProps: ArgTypesEnhancer = ({ parameters }) => {
  const { argTypes } = parameters;
  const parsedOptions: Record<string, any> = {};

  return mapValues((arg: AbstractArgType) => {
    if (arg.name && hasIn(baseProps, arg.name)) {
      return merge(
        {},
        arg,
        createSystemArgType(baseProps[arg.name as keyof typeof baseProps])
      );
    }

    // Find all system props that do not have a description
    if (ALL_PROPS.includes(arg.name) && arg.description === '') {
      const { name } = arg;
      let control: ControlType;
      let options;
      const scaleKey = PROP_MAP?.[name]?.scale;

      if (isString(scaleKey)) {
        // if we have a defined set of options create a specific config for the options
        parsedOptions[scaleKey] =
          parsedOptions[scaleKey] ?? Object.keys(theme[scaleKey]).sort();
        const argOptions = parsedOptions[scaleKey];

        options = argOptions;

        control = {
          type: getControlType(argOptions),
        };
      } else if (isObject(scaleKey)) {
        options = Object.keys(scaleKey).sort();

        // Use JSON editor for anything without options
        control = {
          type: getControlType(options),
        };
      } else {
        control = {
          type: 'text',
        };
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
