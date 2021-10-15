/* eslint-disable local-rules/gamut-import-paths */
import { Box, GridForm, Markdown } from '@codecademy/gamut/src';
import { Background } from '@codecademy/gamut-styles';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';

import { ColorModeExampleWrapper } from '../Foundations/ColorMode/examples';

const onSubmit = action('Submitted!');

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
                  description: 'i checked them...',
                  id: 'my-super-cool-checkbox-color-mode',
                  label: 'check your levels',
                  name: 'check-this',
                  size: 4,
                  type: 'checkbox',
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-color-mode-left-section',
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
                  name: 'text01-color-mode-center-section',
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
                  description: 'i checked them...',
                  id: 'disabled-checkbox-color-mode',
                  label: 'check your levels',
                  name: 'check-this',
                  disabled: true,
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
          onSubmit={onSubmit}
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

export const FormLoadingExample = () => {
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    setLoading(true);
    await wait(2000);
    setLoading(false);
  };

  return (
    <Background bg="navy" p={32}>
      <GridForm
        disableFieldsOnSubmit
        resetOnSubmit
        fields={[
          {
            label: 'Email',
            placeholder:
              'i will disable form fields on loading and reset on correct submission!',
            name: 'im-new',
            type: 'email',
            validation: {
              required: 'pls fill this out',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                message: '😔 that is not an email 😔',
              },
            },
            size: 12,
          },
        ]}
        onSubmit={onSubmit}
        submit={{
          loading,
          contents: 'Submit Me 💖',
          size: 5,
        }}
      />
    </Background>
  );
};
