import { setupEnzyme } from '@codecademy/gamut-tests';

import { DotLoose } from '../src/index';

const renderWrapper = setupEnzyme(DotLoose);

describe('Compiled gamut-icons:', () => {
  it('Allows passing a custom color', () => {
    const { wrapper } = renderWrapper({ color: 'red' });

    expect(wrapper.find('svg').props().color).toEqual('red');
  });

  it('Allows passing a custom height', () => {
    const { wrapper } = renderWrapper({ height: 200 });

    expect(wrapper.find('svg').props().height).toEqual(200);
  });

  it('Allows passing a custom display', () => {
    const { wrapper } = renderWrapper({ display: 'flex' });

    expect(wrapper.find('svg').props().display).toEqual('flex');
  });
});
