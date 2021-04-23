import { setupRtl } from '@codecademy/gamut-tests';

import { Footer } from '../index';

const renderView = setupRtl(Footer, {
  tag: 'tag',
  tagColor: 'green',
});

describe('CurriculumCard Footer', () => {
  it('displays bottom tag by default', () => {
    const { view } = renderView();
    view.getByText('tag');
  });
  it('does not show bottom tag when inProgress', () => {
    const { view } = renderView({ progressState: 'inProgress' });
    expect(view.queryByText('tag')).toBeFalsy();
  });
  it('does not show bottom tag when completed', () => {
    const { view } = renderView({ progressState: 'completed' });
    expect(view.queryByText('tag')).toBeFalsy();
  });
});
