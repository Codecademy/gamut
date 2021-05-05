import { setupEnzyme } from '@codecademy/gamut-tests';

import { Pattern } from '..';

const renderWrapper = setupEnzyme(Pattern, {
  name: 'diagonalStripesRegular',
});

describe('Pattern', () => {
  it('uses the pattern corresponding to the name given', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('#clipDiagonalStripesRegular')).toBeTruthy();
  });

  it('uses the pattern corresponding to another name given', () => {
    const { wrapper } = renderWrapper({ name: 'diagonalStripesDense' });

    expect(wrapper.find('#clipDiagonalStripesDense')).toBeTruthy();
  });
});
