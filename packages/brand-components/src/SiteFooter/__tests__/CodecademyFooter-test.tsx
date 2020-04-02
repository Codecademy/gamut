import { mount } from 'enzyme';
import React from 'react';

import CodecademyFooter from '..';

describe('CodecademyFooter', () => {
  it('remders headings for subject filters', () => {
    const wrapped = mount(<CodecademyFooter />);

    expect(wrapped).toIncludeText('By SubjectFull Catalog');
  });
});
