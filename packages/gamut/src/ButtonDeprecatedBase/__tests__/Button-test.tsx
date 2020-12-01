import { shallow } from 'enzyme';
import React from 'react';

import { ButtonDeprecatedBase } from '../index';

describe('<ButtonDeprecatedBase>', () => {
  it('allows passing an id through props', () => {
    const wrapper = shallow(<ButtonDeprecatedBase id="awesome" />);
    expect(wrapper.find('#awesome').length).toBe(1);
  });

  it('allows a component override when passed through the As prop', () => {
    const wrapper = shallow(<ButtonDeprecatedBase as="div" />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('allows custom props passed through asProps when using component override', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase as="div" asProps={{ customProp: 'myProp' }} />
    );
    expect(wrapper.prop('customProp')).toBe('myProp');
  });
  it('does not utilize asProps when not using component override', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase asProps={{ customProp: 'myProp' }} />
    );
    expect(wrapper.prop('customProp')).toBe(undefined);
  });

  it('uses an <a> tag when you pass in an href and the As prop is omitted', () => {
    const wrapper = shallow(<ButtonDeprecatedBase href="/awesome" />);
    expect(wrapper.find('a').length).toBe(1);
  });

  it('adds rel="noopnener" if no rel is set on <a> tags with target="_blank"', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase href="/awesome" target="_blank" />
    );
    expect(wrapper.prop('rel')).toContain('noopener');
    expect(wrapper.prop('rel')).toContain('noreferrer');
  });

  it('uses a <button> tag when you omit an href and the As prop', () => {
    const wrapper = shallow(<ButtonDeprecatedBase />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('combines a passed down className with the default button styles', () => {
    const wrapper = shallow(<ButtonDeprecatedBase className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('combines a passed down className with the default button styles for a link element', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase href="#" className="myCoolStyle" />
    );
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('uses basic reset styles for a button + reset styles for a link if you pass in a link prop', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase link className="myCoolStyle" />
    );
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle basicLink');
  });

  it('should render with a data-testid attribute', () => {
    const wrapper = shallow(
      <ButtonDeprecatedBase
        id="awesome"
        data-testid="cypressRulesEverythingAroundMe"
      />
    );
    expect(
      wrapper.find('[data-testid="cypressRulesEverythingAroundMe"]').length
    ).toBe(1);
  });
});
