const tipAlignmentOptions = [
  'top-center',
  'bottom-center',
  'left-center',
  'right-center',
] as const;

export const closeButtonPropsArgTypes = ({
  defaultTipText,
  defaultTipAlignment,
}: {
  defaultTipText: string;
  defaultTipAlignment: (typeof tipAlignmentOptions)[number];
}) =>
  ({
    closeButtonProps: {
      table: {
        disable: true, // Disable the closeButtonProps property from the storybook table in favor of the nested args
      },
    },
    'closeButtonProps.hidden': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description:
        'Whether to hide the default close button and pass your own through children to close the modal',
    },
    'closeButtonProps.ref': {
      control: 'text',
      table: {
        type: { summary: 'React.Ref<HTMLButtonElement>' },
      },
      description:
        'An optional ref to be passed to the close button for programmatic access',
    },
    'closeButtonProps.tip': {
      control: 'text',
      description: 'The close button tooltip text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: defaultTipText },
      },
    },
    'closeButtonProps.tipAlignment': {
      control: 'radio',
      options: tipAlignmentOptions,
      description: 'The alignment of the tooltip',
      table: {
        type: {
          summary: tipAlignmentOptions.join(' | '),
        },
        defaultValue: { summary: defaultTipAlignment },
      },
    },
    'closeButtonProps.disabled': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether to disable the default close button',
    },
  } as const);
