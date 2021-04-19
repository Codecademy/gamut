import { setupEnzyme } from '@codecademy/gamut-tests';

import { Pattern } from '..';

const renderWrapper = setupEnzyme(Pattern, {
  name: 'diagonalStripeBRegular',
});

describe('Pattern', () => {
  it('uses the pattern corresponding to the name given', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('#clipDiagonalStripeBRegular')).toBeTruthy();
  });

  it('uses the pattern corresponding to another name given', () => {
    const { wrapper } = renderWrapper({ name: 'diagonalStripeBDense' });

    expect(wrapper.find('#clipDiagonalStripeBDense')).toBeTruthy();
  });
});
