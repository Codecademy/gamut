export const infotipNestedArgTypes = {
  infotip: {
    table: {
      disable: true, // Disable the infotip property from the storybook table in favor of the nested args
    },
  },
  'infotip.emphasis': {
    control: 'radio',
    options: ['high', 'low'],
    table: {
      defaultValue: { summary: 'low' },
      type: { summary: 'high | low' },
    },
  },
  'infotip.alignment': {
    control: 'radio',
    options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    table: {
      defaultValue: { summary: 'top-right' },
      type: { summary: 'bottom-left | bottom-right | top-left | top-right' },
    },
  },
  'infotip.placement': {
    control: 'radio',
    options: ['floating', 'inline'],
    table: {
      defaultValue: { summary: 'inline' },
      type: { summary: 'floating | inline' },
    },
  },
  'infotip.narrow': {
    control: 'boolean',
    table: {
      type: { summary: 'boolean' },
    },
    description:
      'Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.',
  },
  'infotip.inheritDims': {
    control: 'boolean',
    table: {
      type: { summary: 'boolean' },
    },
    description:
      'If ToolTipWrapper should inherit the dimensions of the parent element. Can only be used for inline tips.',
  },
  'infotip.info': {
    control: 'text',
    table: {
      type: { summary: 'string' },
    },
    description: 'The text for the infotip.',
  },
} as const;
