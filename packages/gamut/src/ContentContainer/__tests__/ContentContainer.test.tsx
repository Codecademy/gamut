import { contentWidths } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';

import { ContentContainer } from '..';

const renderView = setupRtl(ContentContainer);

describe('ContentContainer', () => {
  it('has maxInlineSize of contentWidths.max when size is medium', () => {
    const { view } = renderView({ size: 'medium' });

    expect(
      window.getComputedStyle(view.container.firstChild as Element)
        .maxInlineSize
    ).toBe(contentWidths.max);
  });
});
