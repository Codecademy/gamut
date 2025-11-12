import { Box, RadialProgress, Video } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadialProgress> = {
  component: RadialProgress,
  args: {
    strokeLinecap: 'round',
    strokeWidth: 10,
    value: 30,
    size: 120,
    children: '',
  },
};

export default meta;
type Story = StoryObj<typeof RadialProgress>;

export const Default: Story = {
  args: {},
};

export const Children: Story = {
  args: {
    children: '75%',
    size: 60,
    value: 75,
  },
};

export const Animating: Story = {
  render: () => (
    <Box maxHeight="190px" maxWidth="190px">
      <Video
        autoplay
        controls={false}
        loop
        videoTitle="RadialProgress animation example"
        videoUrl="https://i.imgur.com/115O6iY.mp4"
      />
    </Box>
  ),
};
