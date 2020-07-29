import { mount } from 'enzyme';
import React from 'react';

import Anchor from '..';

describe('Anchor', () => {
  it('combines classNames on its root when rootProps contains a className', () => {
    const className = 'class-name';
    const wrapped = mount(<Anchor asProps={{ className }} />);

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) ${className}`));
  });
});
