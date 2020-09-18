import React from 'react';
import { shallow } from 'enzyme';
import { FormError } from '../FormError';

describe('<FormError>', () => {
  it('sets aria-live to assertive by default', () => {
    const wrapper = shallow(<FormError />);
    expect(wrapper.find('span').prop('aria-live')).toEqual('assertive');
  });

  it('sets aria-live to assertive if isFirstError flag is on', () => {
    const wrapper = shallow(<FormError isFirstError={true} />);
    expect(wrapper.find('span').prop('aria-live')).toEqual('assertive');
  });

  it('sets aria-live to off if isFirstError flag is off', () => {
    const wrapper = shallow(<FormError isFirstError={false} />);
    expect(wrapper.find('span').prop('aria-live')).toEqual('off');
  });
});
