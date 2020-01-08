import { mount } from 'enzyme';
import React from 'react';

import { AccessibilityIcon, GamutIconProps } from '../dist/index';

describe('Compiled gamut-icons:', () => {
  it('Converts size to equal width and height', () => {
    const expectedSize = 76;
    const iconProps: GamutIconProps = {
      size: expectedSize,
    };

    const wrapper = mount(<AccessibilityIcon {...iconProps} />);
    const svgEl = wrapper.find('svg');

    expect(svgEl.props().width).toEqual(expectedSize);
    expect(svgEl.props().height).toEqual(expectedSize);
  });

  it('Sets a default fill of currentColor', () => {
    const wrapper = mount(<AccessibilityIcon />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().fill).toEqual('currentColor');
  });

  it('Allows passing a custom color', () => {
    const wrapper = mount(<AccessibilityIcon color="red" />);

    const svgEl = wrapper.find('svg');
    expect(svgEl.props().fill).toEqual('red');
  });

  it('Allows passing a ref', () => {
    let ref: React.MutableRefObject<SVGSVGElement>;
    const RefIcon: React.FC<any> = () => {
      ref = React.useRef<SVGSVGElement>(null);

      return <AccessibilityIcon ref={ref} />;
    };

    mount(<RefIcon color="red" />);

    expect(ref.current).toBeTruthy();
  });
});
