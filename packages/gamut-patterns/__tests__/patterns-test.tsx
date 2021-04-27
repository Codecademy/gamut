import { mount } from 'enzyme';
import React from 'react';

import { DotLoose } from '../src/index';

describe('Compiled gamut-icons:', () => {
  it('Allows passing a custom color', () => {
    const wrapper = mount(<DotLoose color="red" />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().color).toEqual('red');
  });

  it('Allows passing a custom height', () => {
    const wrapper = mount(<DotLoose height={200} />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().height).toEqual(200);
  });

  it('Allows passing a custom display', () => {
    const wrapper = mount(<DotLoose display="flex" />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().display).toEqual('flex');
  });
});
