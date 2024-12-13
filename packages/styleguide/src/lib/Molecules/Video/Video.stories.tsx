import { Video } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Video> = {
  component: Video,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Video>;

export const Default: Story = {
  args: {
    videoUrl: 'https://www.youtube.com/watch?v=wxds6MAtUQ0',
    videoTitle: 'Intro to Programming: Loops',
  },
};

export const Vimeo: Story = {
  args: {
    videoUrl:"https://vimeo.com/773539409",
    videoTitle:"CODECADEMY | Develop Yourself",
  },
};

export const VideoWithPlaceholder: Story = {
  args: {
    videoUrl: "https://player.vimeo.com/video/188237476",
    videoTitle: "A Dream Within a Dream",
    placeholderImage: "https://placekitten.com/400/300",
    autoplay: true
  },
};
