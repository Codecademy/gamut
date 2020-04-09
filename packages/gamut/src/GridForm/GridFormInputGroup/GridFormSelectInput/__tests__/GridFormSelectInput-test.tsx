import { mount } from 'enzyme';
import React from 'react';

import GridFormSelectInput from '..';

describe('GridFormSelectInput', () => {
  it('calls setValue when changed', () => {
    const setValue = jest.fn();
    const options = ['aaa', 'bbb'];
    const wrapped = mount(
      <GridFormSelectInput
        field={{ name: 'name', options, type: 'select' }}
        register={jest.fn()}
        setValue={setValue}
      />
    );

    wrapped
      .find('select')
      .simulate('change', { target: { value: options[1] } });

    expect(setValue).toHaveBeenLastCalledWith(options[1]);
  });
});
