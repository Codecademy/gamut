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
    videoUrl:
      'https://static-assets.codecademy.com/skillshorts/introduction-to-quantum-computing/01-Introduction-to-Quantum-Computing.mp4',
    videoTitle: '01: Introduction-to-Quantum-Computing',
    translations: {
      Play: 'Play Intro Video',
    },
  },
};

export const Youtube: Story = {
  args: {
    videoUrl: 'https://www.youtube.com/watch?v=wxds6MAtUQ0',
    videoTitle: 'Intro to Programming: Loops',
  },
};

export const Vimeo: Story = {
  args: {
    videoUrl: 'https://vimeo.com/773539409',
    videoTitle: 'CODECADEMY | Develop Yourself',
  },
};

export const VideoWithTracksAndThumbnails: Story = {
  args: {
    videoUrl: 'https://files.vidstack.io/sprite-fight/hls/stream.m3u8',
    videoTitle: 'Sprite Fight',
    placeholderImage: 'https://files.vidstack.io/sprite-fight/poster.webp',
    autoplay: false,
    textTracks: [
      {
        src: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
        label: 'English',
        language: 'en-US',
        kind: 'subtitles',
      },
      {
        src: 'https://files.vidstack.io/sprite-fight/subs/spanish.vtt',
        label: 'Spanish',
        language: 'es-ES',
        kind: 'subtitles',
        default: true,
      },
      {
        src: 'https://files.vidstack.io/sprite-fight/chapters.vtt',
        language: 'en-US',
        kind: 'chapters',
        type: 'vtt',
        default: true,
      },
    ],
    thumbnails: 'https://files.vidstack.io/sprite-fight/thumbnails.vtt',
  },
};
