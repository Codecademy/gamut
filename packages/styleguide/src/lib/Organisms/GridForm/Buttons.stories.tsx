import { GridForm } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GridForm> = {
  component: GridForm,
  args: {
    onSubmit: (values) => {
      action('Form Submitted')(values);
      // eslint-disable-next-line no-console
      console.log('Form Submitted', values);
    },
    fields: [
      {
        label: 'Simple text',
        name: 'simple-text',
        type: 'text',
        size: 12,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const SubmitButtonRight: Story = {
  args: {
    submit: {
      contents: 'Right Submit!?',
      position: 'right',
      size: 12,
    },
  },
};

export const SubmitButtonLeft: Story = {
  args: {
    submit: {
      contents: 'Left Submit!?',
      position: 'left',
      size: 12,
    },
  },
};

export const SubmitButtonCenter: Story = {
  args: {
    submit: {
      contents: 'Center Submit!?',
      position: 'center',
      size: 12,
    },
  },
};

export const SubmitButtonStretch: Story = {
  args: {
    submit: {
      contents: 'Stretch Submit!?',
      position: 'stretch',
      size: 12,
    },
  },
};

export const SubmitButtonFill: Story = {
  args: {
    submit: {
      contents: 'Fill Submit!?',
      type: 'fill',
      size: 12,
    },
  },
};

export const SubmitButtonCTA: Story = {
  args: {
    submit: {
      contents: 'CTA Submit!?',
      type: 'cta',
      size: 12,
    },
  },
};

export const SubmitButtonInline: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'simple-text',
        type: 'text',
        size: 6,
      },
    ],
    submit: {
      contents: 'Inline Submit!?',
      size: 4,
      position: 'right',
    },
  },
};

export const CancelButton: Story = {
  args: {
    cancel: {
      children: 'Cancel',
      onClick: () => {},
    },
    submit: {
      contents: 'Submit!?',
      position: 'right',
      size: 12,
    },
  },
};

export const Loading: Story = {
  args: {
    submit: {
      contents: 'Loading Submit!?',
      loading: true,
      size: 12,
    },
  },
};

export const Disabled: Story = {
  args: {
    submit: {
      contents: 'Disabled Submit!?',
      disabled: true,
      size: 12,
    },
  },
};
