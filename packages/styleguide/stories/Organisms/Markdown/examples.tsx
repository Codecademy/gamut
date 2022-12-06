import { Text, TextProps } from '@codecademy/gamut';

export const elements = {
  CodeBlock: {
    component: (props: TextProps) => <Text {...props} />,
  },
  CustomElement: {
    component: ({ title }: { title: string }) => {
      return (
        <Text as="h3" color="primary" fontSize={26} m={24}>
          {title}
        </Text>
      );
    },
    allowedAttributes: ['title'],
  },
};

export const tags = {
  h3: {
    component: (props: TextProps) => (
      <Text {...props} as="h3" fontSize={20} m={16} />
    ),
  },
};
