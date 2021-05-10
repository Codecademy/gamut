import { setupEnzyme } from '@codecademy/gamut-tests';

import { SkipToContent } from '..';

const renderView = setupEnzyme(SkipToContent, { contentId: 'main-area' });

describe('SkipToContent', () => {
  it('has a link to the corresponding content ID', () => {
    const contentId = 'main-area';
    const { wrapper } = renderView();

    const href = wrapper.find('a').prop('href');

    expect(href).toEqual(`#${contentId}`);
  });
});
