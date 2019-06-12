import { mount } from 'enzyme';
import React from 'react';

import TextLink, { TextLinkType } from '..';

describe('TextLink', () => {
  it('renders with the standard class name when type is not provided', () => {
    const wrapped = mount(<TextLink>Hi</TextLink>);

    expect(wrapped.find('button').prop('className')).toMatch(/^(.+) standard$/);
  });

  it('renders with an underline class name when type is underline', () => {
    const wrapped = mount(
      <TextLink type={TextLinkType.UnderlineTransition}>Hi</TextLink>
    );

    expect(wrapped.find('button').prop('className')).toMatch(
      /^(.+) underlineTransition$/
    );
  });
});
