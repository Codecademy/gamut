import { Text } from '@codecademy/gamut';
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
        <Text as="h3" textColor="hyper">
          {title}
        </Text>
      );
    },
    allowedAttributes: ['title'],
  },
};

export const tags = {
  h3: {
    component: (props: any) => <Text {...props} as="h3" fontSize={22} />,
  },
};
