import { VideoPlayer } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof VideoPlayer> = {
  component: VideoPlayer,
  args: {},
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

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
    videoUrl: "https://files.vidstack.io/sprite-fight/720p.mp4",
    videoTitle: "Sprite Fight",
    placeholderImage: "https://files.vidstack.io/sprite-fight/poster.webp",
    autoplay: false,
    controls: false,
    loop: false,
    muted: false,
    textTracks: [{
      "src": "https://files.vidstack.io/sprite-fight/subs/english.vtt",
      "label": "English",
      "language": "en-US",
      "kind": "subtitles"
    }, {
      "src": "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
      "label": "Spanish",
      "language": "es-ES",
      "kind": "subtitles",
      "default": true
    }, {
      "src": "https://files.vidstack.io/sprite-fight/chapters.vtt",
      "language": "en-US",
      "kind": "chapters",
      "type": "vtt",
      "default": true
    }],
    thumbnails: "https://files.vidstack.io/sprite-fight/thumbnails.vtt"
  },
};
