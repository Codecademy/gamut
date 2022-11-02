import { setupRtl } from '@codecademy/gamut-tests';

import { HiddenText } from '..';

const renderView = setupRtl(HiddenText, { children: 'Surprise!' });

describe('HiddenText', () => {
  it('renders', () => {
    const { view } = renderView({});
    expect(view.getByText('Surprise!'));
  });
});
