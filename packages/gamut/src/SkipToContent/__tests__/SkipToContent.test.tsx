import { setupRtl } from '@codecademy/gamut-tests';

import { SkipToContent } from '..';

const renderView = setupRtl(SkipToContent, { contentId: 'main-area' });

describe('SkipToContent', () => {
  it('has a link to the corresponding content ID', () => {
    const contentId = '#main-area';
    const { view } = renderView();

    expect(view.getByRole('link')).toHaveAttribute('href', contentId);
  });
});
