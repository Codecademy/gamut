import { setupEnzyme } from '@codecademy/gamut-tests';

import { DotLoose } from '../src/index';

const renderWrapper = setupEnzyme(DotLoose);

describe('Compiled gamut-icons:', () => {
  it('Allows passing a custom color', () => {
    const { wrapper } = renderWrapper({ color: 'red' });

    expect(wrapper.find('svg').props().color).toEqual('red');
  });
});
