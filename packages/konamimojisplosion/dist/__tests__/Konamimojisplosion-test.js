import { setupRtl } from '@codecademy/gamut-tests';
import { Konamimojisplosion } from '..';
jest.mock('../useKonamimojisplosion', function () {
  return {
    useKonamimojisplosion: function useKonamimojisplosion() {}
  };
});
var renderView = setupRtl(Konamimojisplosion);
describe('Konamimojisplosion', function () {
  it('renders', function () {
    renderView();
  });
});