/* eslint-disable local-rules/gamut-import-paths */
import { GridForm } from '@codecademy/gamut/src';
import React from 'react';

import { ColorModeExampleWrapper } from '../Foundations/ColorMode/examples';

export const ColorModeExample = () => {
  return (
    <ColorModeExampleWrapper>
      <GridForm
        fields={[
          {
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
        ]}
        onSubmit={() => {}}
        sectionGap={48}
        submit={{
          contents: 'Submit me',
          size: 12,
        }}
        validation="onSubmit"
      />
    </ColorModeExampleWrapper>
  );
};
