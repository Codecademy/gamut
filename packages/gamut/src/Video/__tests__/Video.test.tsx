import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import * as React from 'react';

import { Video } from '..';

let mockRenderInShadowRoot = false;

jest.mock('react-player', () => {
  const react = require('react');
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    // Mimics react-player v3: the inner provider iframe has no title.
    default: ({ src }: { src: string }) => {
      const hostRef = react.useRef(null);
      // Insert the iframe after mount, without ever firing onReady, to prove
      // the title doesn't depend on that callback.
      const [show, setShow] = react.useState(false);
      react.useEffect(() => {
        if (!mockRenderInShadowRoot) {
          setShow(true);
          return;
        }
        // Like <youtube-video>: the iframe lives in an open shadow root that
        // is filled in asynchronously.
        const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });
        setTimeout(() => {
          const iframe = shadowRoot.ownerDocument.createElement('iframe');
          iframe.src = src;
          shadowRoot.appendChild(iframe);
        });
      }, []);
      if (mockRenderInShadowRoot) {
        return react.createElement('div', { ref: hostRef });
      }
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
  afterEach(() => {
    mockRenderInShadowRoot = false;
  });

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

  it('labels a provider iframe rendered inside a shadow root', async () => {
    mockRenderInShadowRoot = true;
    const { view } = renderView({
      videoUrl: 'https://www.youtube.com/watch?v=Yl8yy5tpVIM',
      videoTitle: 'Workout with Rick Sanchez',
    });

    await waitFor(() => {
      const iframe = Array.from(view.container.querySelectorAll('*'))
        .map((el) => el.shadowRoot?.querySelector('iframe'))
        .find(Boolean);
      expect(iframe?.title).toBe('Workout with Rick Sanchez');
    });
  });
});
