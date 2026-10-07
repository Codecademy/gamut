import { setupRtl } from '@codecademy/gamut-tests';
import * as React from 'react';

import { Video } from '..';

jest.mock('react-player', () => {
  const react = require('react');
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    // Mimics react-player v3: the inner provider iframe has no title.
    default: ({ src }: { src: string }) => {
      // Insert the iframe after mount, without ever firing onReady, to prove
      // the title doesn't depend on that callback.
      const [show, setShow] = react.useState(false);
      react.useEffect(() => {
        setShow(true);
      }, []);
      return show ? react.createElement('iframe', { src }) : null;
    },
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

    await view.findByTitle('Super Science Friends');
  });

  it('loads a video with a youtube ID', async () => {
    const { view } = renderView({
      videoUrl: 'Yl8yy5tpVIM',
      videoTitle: 'Workout with Rick Sanchez',
    });

    await view.findByTitle('Workout with Rick Sanchez');
  });

  it('gives the provider iframe a default accessible name when no title is passed', async () => {
    const { view } = renderView({
      videoUrl: 'https://www.youtube.com/watch?v=Yl8yy5tpVIM',
    });

    await view.findByTitle('Video player');
  });
});
