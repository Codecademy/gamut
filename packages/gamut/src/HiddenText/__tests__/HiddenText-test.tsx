import { mount } from 'enzyme';
import React from 'react';

import { HiddenText } from '..';

describe('HiddenText', () => {
  it('renders', () => {
    mount(<HiddenText>Surprise!</HiddenText>);
  });
});
