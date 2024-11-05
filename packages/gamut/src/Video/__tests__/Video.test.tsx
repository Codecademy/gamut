import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';

import { Video } from '..';

const renderView = setupRtl(Video, {});

describe('Video', () => {
  it('loads a video with a vimeo URL', async () => {
    await act(async () => {
      const { view } = renderView({
        videoUrl: 'https://vimeo.com/145702525',
        videoTitle: 'Super Science Friends',
      });

      await waitFor(() => view.getByTitle('Super Science Friends'));
    });
  });

  it('loads a video with a youtube ID', async () => {
    await act(async () => {
      const { view } = renderView({
        videoUrl: 'Yl8yy5tpVIM',
        videoTitle: 'Workout with Rick Sanchez',
      });

      await waitFor(() => view.getByTitle('Workout with Rick Sanchez'));
    });
  });
});
