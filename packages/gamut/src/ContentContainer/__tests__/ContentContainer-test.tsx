import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';

import { ContentContainer } from '..';

const renderView = setupRtl(ContentContainer);

describe('ContentContainer', () => {
  it('has maxWidth of contentWidths.max when size is medium', () => {
    const { view } = renderView({ size: 'medium' });

    expect(view.container.firstChild).toHaveStyle(
      `maxWidth: ${theme.content.md}`
    );
  });
});
