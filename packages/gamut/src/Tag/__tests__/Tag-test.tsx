import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { Tag } from '..';

const tagText = 'Tag Text';
const renderTag = setupRtl(Tag, { children: <>{tagText}</> });

describe('Tag', () => {
  it('renders correct text', () => {
    const { view } = renderTag();

    expect(view.getByText(tagText));
  });
});
