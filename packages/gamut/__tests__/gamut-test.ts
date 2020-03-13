import { shallow } from 'enzyme';
import React from 'react';

import * as gamut from '../src/index';

describe('<Gamut/>', () => {
  it('Renders', () => {
    const exportedNames = Object.keys(gamut).sort();
    expect(exportedNames).toMatchSnapshot();
  });
});
