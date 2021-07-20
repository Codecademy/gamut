import { setupEnzyme } from '@codecademy/gamut-tests';

import { Pattern } from '..';

const renderWrapper = setupEnzyme(Pattern, {
  name: 'diagonalStripesRegular',
});

describe('Pattern', () => {
  it('uses the pattern corresponding to the name given', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('#clipDiagonalStripesRegular')).toHaveLength(1);
  });

  it('uses the pattern corresponding to another name given', () => {
    const { wrapper } = renderWrapper({ name: 'diagonalStripesDense' });

    expect(wrapper.find('#clipDiagonalStripesDense')).toHaveLength(1);
  });

  it('appends an id suffix when one is provided', () => {
    const { wrapper } = renderWrapper({ idSuffix: 'Hello' });

    expect(wrapper.find('#clipDiagonalStripesRegularHello')).toHaveLength(1);
  });
});
