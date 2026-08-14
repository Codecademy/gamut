import { setupRtl } from '@codecademy/gamut-tests';
import * as React from 'react';

import { Audio } from '..';

// Stub the Vidstack player: MediaPlayer renders a titled element and ignores its
// children, so the DefaultAudioLayout (and its media context) never has to mount.
jest.mock('@vidstack/react', () => {
  const react = require('react');
  return {
    // eslint-disable-next-line react/display-name
    MediaPlayer: react.forwardRef<
      HTMLAudioElement,
      { src: string; title: string }
    >(
      (
        { src, title }: { src: string; title: string },
        ref: React.Ref<HTMLAudioElement>
      ) => react.createElement('audio', { ref, src, title })
    ),
    MediaProvider: ({ children }: { children: React.ReactNode }) => children,
    Track: () => null,
    useMediaState: () => 0,
  };
});

const renderView = setupRtl(Audio, {});

describe('Audio', () => {
  it('renders the audio player with the given title', async () => {
    const { view } = renderView({
      audioUrl: 'https://example.com/episode.mp3',
      audioTitle: 'Two Friends Talk AI',
    });

    await view.findByTitle('Two Friends Talk AI');
  });

  it('accepts a structured source', async () => {
    const { view } = renderView({
      audioUrl: { src: 'https://example.com/episode.mp3', type: 'audio/mpeg' },
      audioTitle: 'Structured Source',
    });

    await view.findByTitle('Structured Source');
  });
});
