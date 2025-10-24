import { GridForm, Markdown } from '@codecademy/gamut';
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
    submit: {
      contents: 'Submit',
      size: 4,
      position: 'left',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const Formatted: Story = {
  args: {
    fields: [
      {
        label: 'Fave Gamut Component',
        name: 'rowspan-radiogroup',
        options: [
          {
            label: 'FlexBox',
            value: 'flex',
          },
          {
            label: 'GridForm',
            value: 'grid',
          },
          {
            label: 'Text',
            value: 'text',
          },
        ],
        size: 3,
        rowspan: 3,
        type: 'radio-group',
        validation: {
          required: 'You gotta pick one!',
        },
      },
      {
        label: 'Simple text',
        name: 'rowspan-simple-text',
        size: 3,
        type: 'text',
      },
      {
        defaultValue: 'yeet',
        label: 'Text with default value',
        name: 'text-with-default-formatting',
        size: 4,
        type: 'text',
      },
      {
        label: 'Simple select (required)',
        name: 'simple-select-formatting',
        options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
        size: 5,
        type: 'select',
        validation: {
          required: 'Please select an option',
        },
      },
    ],
    requiredTextProps: { color: 'danger', variant: 'title-xs' },
  },
};

export const HideRequiredText: Story = {
  args: {
    fields: [
      {
        label: 'A field',
        placeholder: 'I am very optional',
        name: 'very-optional',
        type: 'text',
        size: 12,
      },
      {
        label: 'A field',
        placeholder: 'I am very optional',
        name: 'very-optional',
        type: 'text',
        size: 12,
      },
    ],
    hideRequiredText: true,
  },
};

export const SoloField: Story = {
  args: {
    fields: [
      {
        label: 'A field',
        placeholder: 'I am a required solo field',
        name: 'so-required',
        type: 'text',
        size: 12,
        validation: {
          required: 'I am required',
        },
      },
    ],
  },
};

export const InfoTip: Story = {
  args: {
    fields: [
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          alignment: 'bottom-left',
        },
        label: 'Tool input',
        name: 'input-field',
        size: 6,
        type: 'text',
      },
      {
        infotip: {
          info: <Markdown text="My grandmother used to tell me stories..." />,
          alignment: 'bottom-right',
        },
        label: 'Select with infotip',
        options: ['', 'Water', 'Earth', 'Fire', 'Air', 'Boomerang'],
        size: 3,
        type: 'select',
        validation: {
          required: 'Please select an option',
        },
        name: 'select-field',
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        label: 'Write a paragraph about infotips',
        name: 'textarea-field',
        size: 6,
        type: 'textarea',
        rows: 6,
        placeholder: 'Check out my infotip',
        validation: {
          required: 'Please write something about infotips!',
        },
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        label: 'Preferred Modern Artist',
        name: 'modern-artist',
        options: [
          {
            label: 'Taylor Swift',
            value: 'taylor-swift',
          },
          {
            label: 'Beyonce',
            value: 'beyonce',
          },
        ],
        size: 3,
        type: 'radio-group',
        validation: {
          required: 'You gotta pick one!',
        },
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          alignment: 'bottom-right',
        },
        label: 'End User License Agreement',
        description: 'I promise that I read it',
        name: 'eula-checkbox-required-agreement',
        size: 4,
        type: 'checkbox',
        validation: {
          required: 'Please check the box to agree to the terms.',
        },
      },
    ],
  },
};

export const Sections: Story = {
  args: {
    fields: [
      {
        title: 'first section',
        layout: 'left',
        variant: 'title-xs',
        titleWrapperProps: {
          color: 'danger',
        },
        fields: [
          {
            label: 'hi?',
            name: 'text01-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'hello?',
            name: 'text02-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'Write a paragraph.',
            name: 'paragraph01-left-section',
            size: 8,
            type: 'textarea',
            validation: {
              required: 'Please write something about penguins!',
            },
          },
          {
            label: 'howdy?',
            name: 'text03-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'whats up?',
            name: 'text04--left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'Write another long paragraph',
            name: 'paragraph02-left-section',
            size: 8,
            type: 'textarea',
            validation: {
              required: 'Please write something about penguins!',
            },
          },
        ],
      },
      {
        title: 'hi there... again',
        as: 'h3',
        fields: [
          {
            label: 'hello....',
            name: 'text01-center-section',
            size: 5,
            type: 'text',
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
    requiredTextProps: { color: 'primary', fontStyle: 'italic' },
  },
};
