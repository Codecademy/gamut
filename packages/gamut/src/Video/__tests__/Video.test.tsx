import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import * as React from 'react';

import { Video } from '..';

jest.mock('react-player', () => {
  const react = require('react');
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({ src }: { src: string }) =>
      react.createElement('iframe', { src }),
  };
});

jest.mock('@vidstack/react', () => {
  const react = require('react');
  return {
    // eslint-disable-next-line react/display-name
    MediaPlayer: react.forwardRef<
      HTMLIFrameElement,
      { src: string; title: string }
    >(
      (
        { src, title }: { src: string; title: string },
        ref: React.Ref<HTMLIFrameElement>
      ) => react.createElement('iframe', { ref, src, title })
    ),
    MediaProvider: ({ children }: { children: React.ReactNode }) => children,
    Poster: ({ src, alt }: { src: string; alt: string }) =>
      react.createElement('img', { alt, src }),
    Track: () => null,
    useMediaState: () => false,
    useMediaRemote: () => ({}),
  };
});

const renderView = setupRtl(Video, {});

describe('Video', () => {
  it('loads a video with a vimeo URL', async () => {
    const { view } = renderView({
      videoUrl: 'https://vimeo.com/1218916076',
      videoTitle: 'Super Science Friends',
    });

    await waitFor(() =>
      expect(view.container.querySelector('iframe')).toBeInTheDocument()
    );
  });

  it('loads a video with a youtube ID', async () => {
    const { view } = renderView({
      videoUrl: 'Yl8yy5tpVIM',
      videoTitle: 'Workout with Rick Sanchez',
    });

    await waitFor(() =>
      expect(view.container.querySelector('iframe')).toBeInTheDocument()
    );
  });
});
