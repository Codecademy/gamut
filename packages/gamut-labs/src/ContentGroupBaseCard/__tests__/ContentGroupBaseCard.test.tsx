import { setupRtl } from 'component-test-setup';

import { ContentGroupBaseCard } from '..';

const renderView = setupRtl(ContentGroupBaseCard, {
  headerBackgroundColor: 'pink',
  headerText: 'Course',
  headingLevel: 'h3',
  title: 'Python 101',
  numLessons: 20,
});

describe('ContentGroupBaseCard', () => {
  it('loads', () => {
    const { view } = renderView();

    expect(view.getByRole('heading', { level: 3 })).toHaveTextContent('Course');
  });
});
