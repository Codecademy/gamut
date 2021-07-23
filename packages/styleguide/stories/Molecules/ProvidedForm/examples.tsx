/* eslint-disable local-rules/gamut-import-paths */

import { Box, CTAButton, FormField, FormWrapper } from '@codecademy/gamut/src';
import { action } from '@storybook/addon-actions';
import React from 'react';

export const ProvidedForm = (args: any) => {
  return (
    <Box height="40rem">
      <FormWrapper
        onSubmit={async (values) => {
          action('Form Submitted')(values);
        }}
        validation="onSubmit"
      >
        <FormField
          field={{
            label: 'Who is the best at bending?',
            name: 'custom-error',
            size: 5,
            type: 'text',
            validation: {
              required: true,
              pattern: {
                value: /Bender/,
                message: 'Just type Bender...',
              },
            },
          }}
        />
        <CTAButton type="submit" size="normal">
          hello
        </CTAButton>
        <FormField
          field={{
            label: 'Who is the best at bending?',
            name: 'custom-222',
            size: 5,
            type: 'text',
            validation: {
              required: true,
              pattern: {
                value: /Bender/,
                message: 'Just type Bender...',
              },
            },
          }}
        />
      </FormWrapper>
    </Box>
  );
};
