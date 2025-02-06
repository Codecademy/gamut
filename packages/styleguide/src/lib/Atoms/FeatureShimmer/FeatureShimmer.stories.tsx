import { FeatureShimmer } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FeatureShimmer> = {
  component: FeatureShimmer,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureShimmer>;

export const Default: Story = {
  args: {
    children: 'This is a test',
  },
  render: (args) => <FeatureShimmer {...args} />,
};
