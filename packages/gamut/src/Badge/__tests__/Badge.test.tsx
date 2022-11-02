import { setupRtl } from '@codecademy/gamut-tests';

import { Badge } from '..';

const badgeText = 'I am a badge';
const renderView = setupRtl(Badge, { children: badgeText });

describe('Badge', () => {
  it('renders badge text', () => {
    const { view } = renderView();

    expect(view.getByText(badgeText));
  });
});
