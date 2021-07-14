/* eslint-disable local-rules/gamut-import-paths */
import { Box, GridForm, Markdown } from '@codecademy/gamut/src';
import React from 'react';

import { ColorModeExampleWrapper } from '../Foundations/ColorMode/examples';

export const ColorModeExample = () => {
  return (
    <ColorModeExampleWrapper>
      <Box m={8}>
        <GridForm
          fields={[
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode',
                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode',
                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode',
                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode',
                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                  tooltip: {
                    children: <Markdown text="There can only be one." />,
                    id: 'select-tooltip',
                    alignment: 'bottom-left',
                    mode: 'light',
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
                  tooltip: {
                    children: <Markdown text="It *is* required ✨" />,
                    id: 'select-tooltip',
                    alignment: 'top-right',
                    mode: 'dark',
                  },
                },
              ],
              layout: 'left',
              title: 'first section',
            },
            {
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
              title: 'hi there... again',
            },
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode-disabled',
                  disabled: true,

                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  description: 'checkbox',
                  id: 'my-super-cool-checkbox-color-mode',
                  label: 'check levels',
                  name: 'check-this',
                  size: 3,
                  type: 'checkbox',
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode-disabled',
                  disabled: true,

                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode-disabled',
                  disabled: true,

                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode-disabled',
                  disabled: true,

                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                },
                {
                  label: 'whats up?',
                  name: 'text04--left-section-disabled',
                  size: 4,
                  type: 'text',
                  disabled: true,
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-left-section-disabled',
                  size: 8,
                  type: 'textarea',
                  disabled: true,
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
              ],
              layout: 'left',
              title: 'disabled inputs',
            },
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode-error',
                  customError: 'something',

                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode-error',
                  customError: 'has',

                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode-error',
                  customError: 'gone',

                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode-error',
                  customError: 'very',

                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                },
                {
                  label: 'whats up?',
                  name: 'text04-error',
                  size: 4,
                  type: 'text',
                  customError: 'very',

                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-error',
                  size: 8,
                  type: 'textarea',
                  customError: 'wrong',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
              ],
              title: 'something has gone wrong',
            },
          ]}
          onSubmit={() => {}}
          submit={{
            contents: 'Submit me',
            size: 12,
          }}
          validation="onSubmit"
        />
      </Box>
    </ColorModeExampleWrapper>
  );
};
