import { Heading, Text } from '@codecademy/gamut';
import React from 'react';

export const elements = {
  CodeBlock: {
    component: (props: any) => (
      <Text style={{ color: 'darkblue' }} {...props} />
    ),
  },
  CustomElement: {
    component: ({ title }: { title: string }) => {
      return (
        <Heading
          as="h3"
          fontSize="md"
          style={{
            color: 'rebeccapurple',
          }}
        >
          {title}
        </Heading>
      );
    },
    allowedAttributes: ['title'],
  },
};

export const tags = {
  h3: {
    component: (props: any) => <Heading {...props} as="h3" size="xs" />,
  },
};
