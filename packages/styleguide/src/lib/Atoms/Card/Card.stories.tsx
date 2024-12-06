import { Anchor, Card, Column, LayoutGrid } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    children: 'Hello world I am a Card',
    p: 16,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
};

export const White: Story = {
  args: {
    variant: 'white',
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
  },
};

export const Navy: Story = {
  args: {
    variant: 'navy',
  },
};

export const Hyper: Story = {
  args: {
    variant: 'hyper',
  },
};

export const Beige: Story = {
  args: {
    variant: 'beige',
  },
};

export const SmallShadow: Story = {
  args: {
    shadow: 'small',
  },
};

export const MediumShadow: Story = {
  args: {
    shadow: 'medium',
  },
};

export const OutlineShadow: Story = {
  args: {
    shadow: 'outline',
  },
};

export const OutlineShadowColor: Story = {
  args: {
    shadow: 'outline',
    variant: 'yellow',
  },
};

export const Link: Story = {
  render: (args) => (
    <Anchor variant="interface">
      <Card {...args} />
    </Anchor>
  ),
  args: {
    shadow: 'medium',
  },
};

export const Dynamic: Story = {
  render: () => (
    <LayoutGrid>
      <Column size={6}>
        <Background
          p={32}
          bg="navy"
          borderColor="black"
          border={1}
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
        >
          <Card height="100%" shadow="small">
            <Anchor variant={false}>Click Me!</Anchor>
          </Card>
        </Background>
      </Column>
      <Column size={6}>
        <Background
          p={32}
          bg="white"
          borderColor="black"
          border={1}
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
        >
          <Card height="100%" shadow="small">
            <Anchor variant={false}>Click Me!</Anchor>
          </Card>
        </Background>
      </Column>
    </LayoutGrid>
  ),
};
