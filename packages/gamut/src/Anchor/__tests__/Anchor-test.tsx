import { mount } from 'enzyme';
import React from 'react';

import Anchor from '..';

describe('Anchor', () => {
  it('renders', () => {
    const className = 'class-name';

    mount(
      <Anchor className={className} href="/">
        Link me!
      </Anchor>
    );
  });
});
