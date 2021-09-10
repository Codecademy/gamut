import { setupRtl } from '@codecademy/gamut-tests';

import { Konamimojisplosion } from '..';

jest.mock('../useKonamimojisplosion', () => ({
  useKonamimojisplosion: jest.fn(),
}));

const renderView = setupRtl(Konamimojisplosion);

describe('Konamimojisplosion', () => {
  it('renders', () => {
    renderView();
  });
});
