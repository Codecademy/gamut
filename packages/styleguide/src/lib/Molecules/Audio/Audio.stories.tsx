import { Audio } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Audio> = {
  component: Audio,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Audio>;

export const Default: Story = {
  args: {
    audioUrl: 'https://files.vidstack.io/sprite-fight/audio.mp3',
    audioTitle: 'Sprite Fight (Audio)',
    translations: {
      Play: 'Play Episode',
    },
  },
};

export const WithCaptions: Story = {
  args: {
    audioUrl: 'https://files.vidstack.io/sprite-fight/audio.mp3',
    audioTitle: 'Sprite Fight (Audio)',
    textTracks: [
      {
        src: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
        label: 'English',
        language: 'en-US',
        kind: 'captions',
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
  },
};
