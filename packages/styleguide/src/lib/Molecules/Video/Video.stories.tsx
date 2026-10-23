import { FlexBox } from '@codecademy/gamut';
import { Video } from '@codecademy/gamut/Video';
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
    videoUrl: 'https://vimeo.com/1218916076',
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

/*
  Mirrors the learning environment's Video pane: its `videoContainer` and
  `externalHostedVideo` CSS-module classes (plain CSS, not Emotion) are passed
  as `className`, and the frame sits in a full-height flex section.
*/
const learningEnvironmentStyles = `
  .le-video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #10162f;
    position: relative;
  }
  .le-external-hosted-video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const LearningEnvironmentFrame: Story = {
  args: {
    videoUrl: 'https://youtu.be/np1R108qmdo',
    videoTitle: 'Prompt Engineering for RAG',
  },
  render: (args) => (
    <FlexBox height={600} position="relative" width="100%">
      <style>{learningEnvironmentStyles}</style>
      <FlexBox
        as="section"
        flex={1}
        flexDirection="column"
        flexShrink={0}
        height="100%"
        overflowY="hidden"
        position="relative"
      >
        <Video
          {...args}
          className="le-video-container le-external-hosted-video"
        />
      </FlexBox>
    </FlexBox>
  ),
};
