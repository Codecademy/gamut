import { FeatureShimmer, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FeatureShimmer> = {
  component: FeatureShimmer,
  args: {
    children: <Text p={12}>This is a test</Text>,
    height: '144px',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureShimmer>;

export const Default: Story = {};
