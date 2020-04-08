import { mount } from 'enzyme';
import React from 'react';

import SkipToContent from '..';

describe('SkipToContent', () => {
  it('has a link to the corresponding content ID', () => {
    const contentId = 'main-area';
    const wrapped = mount(<SkipToContent contentId={contentId} />);

    const href = wrapped.find('a').prop('href');

    expect(href).toEqual(`#${contentId}`);
  });
});
