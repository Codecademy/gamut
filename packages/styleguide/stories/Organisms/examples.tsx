import { Anchor, GridForm } from '@codecademy/gamut';
import React from 'react';

export const Hey: React.FC = () => {
  return (
    <GridForm
      fields={[
        {
          disabled: true,
          label: 'Disabled text',
          name: 'disabled-text',
          size: 6,
          type: 'text',
        },
        {
          label: 'Enabled text',
          name: 'enabled-text',
          size: 6,
          type: 'text',
        },
        {
          label: 'Simple select (required)',
          name: 'simple-select',
          options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
          size: 5,
          type: 'select',
          validation: {
            pattern: {
              message: <>hey</>,
              value: /swag(.*)swag/,
            },
            required: true,
          },
        },
      ]}
      onSubmit={() => console.log('hi')}
      submit={{
        contents: `hey Manual Pro Access`,
        size: 12,
      }}
    />
  );
};
