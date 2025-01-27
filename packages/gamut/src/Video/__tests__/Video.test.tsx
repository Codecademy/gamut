import { setupRtl } from '@codecademy/gamut-tests';

import { Video } from '..';

jest.mock('@vidstack/react', () => ({
  MediaPlayer: jest.fn(({ src, title }) => <iframe src={src} title={title} />),
  MediaProvider: jest.fn(),
  Poster: jest.fn(),
  Track: jest.fn(),
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
