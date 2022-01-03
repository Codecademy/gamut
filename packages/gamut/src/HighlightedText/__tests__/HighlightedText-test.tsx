import { setupRtl } from '@codecademy/gamut-tests';

import { HighlightedText } from '..';

const renderView = setupRtl(HighlightedText);

describe('HighlightedText', () => {
  it('preserves text children with whitespace', () => {
    const text = 'abc    def \t ghi\njkl';
    const { view } = renderView({ children: text });

    expect(view.baseElement.textContent).toBe(text);
  });
});
