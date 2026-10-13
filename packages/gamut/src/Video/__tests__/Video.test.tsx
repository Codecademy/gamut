import { setupRtl } from '@codecademy/gamut-tests';
import * as React from 'react';

import { Video } from '..';

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

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ??
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
});

const renderView = setupRtl(Video, {});

describe('Video', () => {
  it('loads a video with a vimeo URL and forwards data-*/aria-* attributes to the outer container', async () => {
    // The legacy ReactPlayer branch lazy-loads its provider module once per
    // provider type, so this is folded into the existing vimeo test rather
    // than given its own render: a second render targeting the same
    // (vimeo) provider trips up react-player's lazy-loading in this test
    // environment.
    const { view } = renderView({
      videoUrl: 'https://vimeo.com/145702525',
      videoTitle: 'Super Science Friends',
      'data-marker': 'probe',
      'aria-keyshortcuts': 'probeAria',
    } as any);

    await view.findByTitle('Super Science Friends');

    const wrapper = view.container.querySelector('[data-marker="probe"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveAttribute('aria-keyshortcuts', 'probeAria');
  });

  it('loads a video with a youtube ID', async () => {
    const { view } = renderView({
      videoUrl: 'Yl8yy5tpVIM',
      videoTitle: 'Workout with Rick Sanchez',
    });

    await view.findByTitle('Workout with Rick Sanchez');
  });

  describe('Attribute passthrough', () => {
    it('forwards data-* and aria-* attributes to the outer container on the Vidstack path', async () => {
      const { view } = renderView({
        videoUrl: 'https://example.com/video.mp4',
        videoTitle: 'Self-hosted video',
        'data-marker': 'probe',
        'aria-keyshortcuts': 'probeAria',
      } as any);

      await view.findByTitle('Self-hosted video');

      const wrapper = view.container.querySelector('[data-marker="probe"]');
      expect(wrapper).not.toBeNull();
      expect(wrapper).toHaveAttribute('aria-keyshortcuts', 'probeAria');
    });
  });
});
