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

  it('displays a beta sticker', () => {
    const { view } = renderView({ beta: true });
    view.getByText('BETA');
  });

  it('does not display tag information when beta is true', () => {
    const { view } = renderView({ beta: true });
    expect(view.queryByText('tag')).toBeFalsy();
  });

  it('does not display beta sticker when inProgress', () => {
    const { view } = renderView({ beta: true, progressState: 'inProgress' });
    expect(view.queryByText('BETA')).toBeFalsy();
  });

  it('does not display beta sticker when completed', () => {
    const { view } = renderView({ beta: true, progressState: 'completed' });
    expect(view.queryByText('BETA')).toBeFalsy();
  });

  it('displays enrolled footer variant by default', () => {
    const { view } = renderView({ progressState: 'inProgress' });
    view.getByText('Enrolled...');
  });

  it('displays inProgress footer variant', () => {
    const { view } = renderView({
      progressState: 'inProgress',
      footerTextVariant: 'inProgress',
    });
    expect(view.queryByText('In Progress...')).toBeTruthy();
  });
});
