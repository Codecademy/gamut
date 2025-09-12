import { AccordionButtonDeprecated } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AccordionButtonDeprecated> = {
  component: AccordionButtonDeprecated,
  args: {
    children: 'Click me!',
    expanded: true,
    size: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof AccordionButtonDeprecated>;

export const Default: Story = {
  args: {},
};

export const Plain: Story = {
  args: {
    theme: 'plain',
  },
};

export const Yellow: Story = {
  args: {
    theme: 'yellow',
  },
};

export const Blue: Story = {
  args: {
    theme: 'blue',
  },
};
