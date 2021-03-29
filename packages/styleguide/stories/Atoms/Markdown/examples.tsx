import { DeprecatedHeading, DeprecatedText } from '@codecademy/gamut';
import React from 'react';

export const elements = {
  CodeBlock: {
    component: (props: any) => (
      <DeprecatedText style={{ color: 'darkblue' }} {...props} />
    ),
  },
  CustomElement: {
    component: ({ title }: { title: string }) => {
      return (
        <DeprecatedHeading
          as="h3"
          fontSize="md"
          style={{
            color: 'rebeccapurple',
          }}
        >
          {title}
        </DeprecatedHeading>
      );
    },
    allowedAttributes: ['title'],
  },
};

export const tags = {
  h3: {
    component: (props: any) => (
      <DeprecatedHeading {...props} as="h3" size="xs" />
    ),
  },
};
