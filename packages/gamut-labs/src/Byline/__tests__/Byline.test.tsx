import { setupRtl } from '@codecademy/gamut-tests';

import { Byline } from '..';

const renderView = setupRtl(Byline, {
  firstName: 'César',
  lastName: 'Milan',
  occupation: 'Dog Whisperer',
  location: 'Los Angeles, CA',
});

describe('Byline', () => {
  it('displays a location when present', () => {
    const { view } = renderView();

    view.getByText('Los Angeles, CA');
  });
});
