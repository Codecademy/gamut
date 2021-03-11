import { contentWidths } from '@codecademy/gamut-styles';
import { render } from '@testing-library/react';
import React from 'react';

import { ContentContainer } from '..';

type mockRenderProp = Record<'size', 'medium' | 'wide'>;

const mockRender = (props: mockRenderProp) =>
  render(<ContentContainer {...props} />);

describe('ContentContainer', () => {
  it('has maxWidth of contentWidths.max when size is medium', () => {
    const { container } = mockRender({ size: 'medium' });
    expect(container.firstChild).toHaveStyle(`maxWidth: ${contentWidths.max}`);
  });
});
