import { setupRtl } from '@codecademy/gamut-tests';

import { HiddenText } from '..';

const renderView = setupRtl(HiddenText);

describe('HiddenText', () => {
  it('renders', () => {
    renderView({
      children: 'Surprise!',
    });
  });
});
