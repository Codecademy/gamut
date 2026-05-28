import { setupRtl } from '@codecademy/gamut-tests';

import { PatternBackdrop } from '../PatternBackdrop';

const renderView = setupRtl(PatternBackdrop, {
  children: 'Float on okay',
});

describe('PatternBackdrop', () => {
  it('renders children with the default checker pattern', () => {
    const { view } = renderView();
    view.getByText('Float on okay');
    view.getByTitle('Checker Dense');
  });
});
