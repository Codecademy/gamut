import { setupRtl } from '@codecademy/gamut-tests';

import { Badge } from '..';

const renderView = setupRtl(Badge);

describe('Badge', () => {
  it('renders badge text', () => {
    const badgeText = 'I am a badge';
    const { view } = renderView({ children: badgeText });

    expect(view.baseElement.textContent).toEqual(badgeText);
  });
});
