import { ContentContainer } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ContentContainer> = {
  component: ContentContainer,
  args: { children: 'Some random content' },
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {
  args: { size: 'medium' },
};

export const Wide: Story = {
  args: {
    size: 'wide',
  },
};
