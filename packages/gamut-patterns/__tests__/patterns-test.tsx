import { setupEnzyme } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';

import { DotLoose } from '../src/index';

const renderWrapper = setupEnzyme(DotLoose);

expect.extend(matchers);

describe('Compiled gamut-icons:', () => {
  it('Allows passing a custom size', () => {
    const { wrapper } = renderWrapper({ width: '100px' });

    expect(wrapper.find('svg')).toHaveStyleRule('width', '100px');
  });
});
