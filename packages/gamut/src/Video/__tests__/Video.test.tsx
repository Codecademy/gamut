import { setupRtl } from '@codecademy/gamut-tests';

import { Video } from '..';

jest.mock('@vidstack/react', () => ({
  MediaPlayer: ({
    src,
    title,
    ref,
  }: {
    src: string;
    title: string;
    ref: React.Ref<HTMLIFrameElement>;
  }) => <iframe ref={ref} src={src} title={title} />,
  MediaProvider: ({ children }: { children: React.ReactNode }) => children,
  Poster: ({ src, alt }: { src: string; alt: string }) => (
    <img alt={alt} src={src} />
  ),
  Track: () => null,
  useMediaState: () => false,
  useMediaRemote: () => ({}),
}));

const renderView = setupRtl(Video, {});

describe('Video', () => {
  it('loads a video with a vimeo URL', async () => {
    const { view } = renderView({
      videoUrl: 'https://vimeo.com/145702525',
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
});
