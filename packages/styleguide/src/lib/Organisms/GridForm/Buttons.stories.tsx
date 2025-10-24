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
    fields: [
      {
        label: 'Simple text',
        name: 'right-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Right Submit!?',
      position: 'right',
      size: 12,
    },
  },
};

export const SubmitButtonLeft: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'left-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Left Submit!?',
      position: 'left',
      size: 12,
    },
  },
};

export const SubmitButtonCenter: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'center-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Center Submit!?',
      position: 'center',
      size: 12,
    },
  },
};

export const SubmitButtonStretch: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'stretch-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Stretch Submit!?',
      position: 'stretch',
      size: 12,
    },
  },
};

export const SubmitButtonFill: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'fill-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Fill Submit!?',
      type: 'fill',
      size: 12,
    },
  },
};

export const SubmitButtonCTA: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'cta-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
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
        hideLabel: true,
        label: 'Label',
        name: 'email',
        size: 8,
        type: 'text',
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
    fields: [
      {
        label: 'Simple text',
        name: 'cancel-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
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
