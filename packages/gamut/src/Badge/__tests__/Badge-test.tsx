import { mount } from 'enzyme';
import React from 'react';

import { Badge } from '..';

describe('Badge', () => {
  it('combines classNames on its root when rootProps contains a className', () => {
    const className = 'class-name';
    const wrapped = mount(<Badge rootProps={{ className }} />);

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) ${className}`));
  });
});
