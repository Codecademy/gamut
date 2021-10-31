import { setupRtl } from '@codecademy/gamut-tests';

import { LanguageSelection } from '../languageSelection';

const renderWrapper = setupRtl(LanguageSelection, {
  onChange: () => {},
});

describe('LanguageSelection', () => {
  it('has placeholder text', () => {
    const { view } = renderWrapper();
    view.getByText('Select your language');
  });
});
