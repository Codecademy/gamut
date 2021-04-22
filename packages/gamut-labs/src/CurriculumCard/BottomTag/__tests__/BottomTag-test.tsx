import { setupRtl } from '@codecademy/gamut-tests';

import { BottomTag } from '../index';

const renderView = setupRtl(BottomTag, {
  text: 'this is a test',
  color: 'pink',
});

describe('CurriculumCard BottomTag', () => {
  it('displays text', () => {
    const { view } = renderView();
    view.getByText('this is a test');
  });
});
