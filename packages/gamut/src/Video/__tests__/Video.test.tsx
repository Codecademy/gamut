import { setupRtl } from '@codecademy/gamut-tests';

import { Video } from '..';

const renderView = setupRtl(Video, {});

describe('Video', () => {
  it('loads a video with a vimeo URL', () => {
    const { view } = renderView({
      videoUrl: 'https://vimeo.com/145702525',
      videoTitle: 'Super Science Friends',
    });

    view.getByTitle('Super Science Friends');
  });

  it('loads a video with a youtube ID', () => {
    const { view } = renderView({
      videoUrl: 'Yl8yy5tpVIM',
      videoTitle: 'Workout with Rick Sanchez',
    });

    view.getByTitle('Workout with Rick Sanchez');
  });
});
