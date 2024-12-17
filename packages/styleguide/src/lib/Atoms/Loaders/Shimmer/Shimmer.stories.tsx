import { Box, Shimmer } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Shimmer> = {
  component: Shimmer,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: {
    height: 200,
  },
};

const RoundedShimmer = styled(Shimmer)(
  css({
    borderRadius: 'md',
    overflow: 'hidden',
  })
)

export const RoundedShimmerExample: Story = {
  render: () => (
      <RoundedShimmer height={200} />
  ),
}
