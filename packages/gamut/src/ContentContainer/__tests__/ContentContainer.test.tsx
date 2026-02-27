import { contentWidths } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';

import { ContentContainer } from '..';

const renderView = setupRtl(ContentContainer);

describe('ContentContainer', () => {
  // Note: Only testing one mode here since variant() caches styles after first render.
  it('has maxInlineSize of contentWidths.max when size is medium', () => {
    const useLogicalProperties = true;
    const maxWidthProp = useLogicalProperties ? 'maxInlineSize' : 'maxWidth';

    const { view } = renderView({ size: 'medium' });

    expect(view.container.firstChild).toHaveStyle(
      `${maxWidthProp}: ${contentWidths.max}`
    );
  });
});
