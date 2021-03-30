import { HeadingDeprecated, TextDeprecated } from '@codecademy/gamut';
import React from 'react';

export const elements = {
  CodeBlock: {
    component: (props: any) => (
      <TextDeprecated style={{ color: 'darkblue' }} {...props} />
    ),
  },
  CustomElement: {
    component: ({ title }: { title: string }) => {
      return (
        <HeadingDeprecated
          as="h3"
          fontSize="md"
          style={{
            color: 'rebeccapurple',
          }}
        >
          {title}
        </HeadingDeprecated>
      );
    },
    allowedAttributes: ['title'],
  },
};

export const tags = {
  h3: {
    component: (props: any) => (
      <HeadingDeprecated {...props} as="h3" size="xs" />
    ),
  },
};
