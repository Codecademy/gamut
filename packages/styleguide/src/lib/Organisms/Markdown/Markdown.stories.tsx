import { Markdown , Text, TextProps } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import exampleMarkdown from './example.md';

const meta: Meta<typeof Markdown> = {
  component: Markdown,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Default: Story = {
  args: {
    text: `
## Hello World
This is markdown
    `,
    spacing: 'tight',
  },
};

export const FullExample: Story = {
  args: {
    // Not sure why there's a type mismatch, but the story renders
    text: exampleMarkdown as any
  }
}

const elements = {
  CodeBlock: {
    component: (props: TextProps) => <Text {...(props as any)} />,
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

export const Overrides: Story = {
  args: {
    overrides: elements,
    text: `"## Hello World
        <CodeBlock>Span inside a custom code block element</CodeBlock>
        <CustomElement title='A Custom Component' />"`,
  }
}

const tags = {
  h3: {
    component: (props: TextProps) => (
      <Text {...props} as="h3" fontSize={20} m={16} />
    ),
  },
};

export const HeaderOverride: Story = {
  args:{ overrides: tags, text: '### Smaller H3' }
}

export const LinkOverride: Story = {
  args: {
    text: '[This was a link](https://codecademy.com), Now it is not.',
    overrides: {
      a: {
        component: (props) => <Text {...props} as="span" color="blue-500" />,
      },
    },
  }
}

export const InlineMarkdown: Story = {
  args: { text: `this is an inline markdown component`, inline: true },
  render: (args) => {
    return (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        <Markdown {...args} />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </>
    )
  }

}
