import { mount } from 'enzyme';
import React from 'react';

import { AddIcon } from '../dist/index';

describe('Compiled gamut-icons:', () => {
  it('Hides the icon from screen readers by default', () => {
    const wrapper = mount(<AddIcon />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props()['aria-hidden']).toEqual('true');
  });

  it('Sets a title and id automatically and uses the appropriate aria label', () => {
    const wrapper = mount(<AddIcon size={1} />);

    const svgEl = wrapper.find('svg');
    const titleEl = wrapper.find('title');
    expect(svgEl.props()['aria-labelledby']).toEqual(titleEl.props().id);
    expect(titleEl.text()).toEqual('Add Icon');
  });

  it('Allows passing a custom title', () => {
    const wrapper = mount(<AddIcon title="Accessible" />);

    const titleEl = wrapper.find('title');
    expect(titleEl.text()).toEqual('Accessible');
  });

  it('Sets a default fill of currentColor', () => {
    const wrapper = mount(<AddIcon />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().fill).toEqual('currentColor');
  });

  it('Allows passing a ref', () => {
    let ref: React.MutableRefObject<SVGSVGElement>;
    const RefIcon: React.FC<any> = () => {
      ref = React.useRef<SVGSVGElement>(null);

      return <AddIcon ref={ref} />;
    };

    mount(<RefIcon color="red" />);

    expect(ref.current).toBeTruthy();
  });
});
