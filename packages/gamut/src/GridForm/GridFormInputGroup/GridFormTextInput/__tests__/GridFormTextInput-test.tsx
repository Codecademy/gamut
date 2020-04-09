import { mount } from 'enzyme';
import React from 'react';

import GridFormTextInput from '..';

describe('GridFormTextInput', () => {
  it('calls setValue when changed', () => {
    const setValue = jest.fn();
    const options = ['aaa', 'bbb'];
    const wrapped = mount(
      <GridFormTextInput
        field={{ name: 'name', type: 'text' }}
        register={jest.fn()}
        setValue={setValue}
      />
    );

    wrapped.find('input').simulate('change', { target: { value: options[1] } });

    expect(setValue).toHaveBeenLastCalledWith(options[1]);
  });
});
