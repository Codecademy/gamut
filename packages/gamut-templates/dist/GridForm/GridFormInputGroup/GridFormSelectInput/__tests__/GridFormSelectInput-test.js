import { mount } from 'enzyme';
import React from 'react';
import GridFormSelectInput from '..';
describe('GridFormSelectInput', function () {
  it('calls setValue when changed', function () {
    var setValue = jest.fn();
    var options = ['aaa', 'bbb'];
    var wrapped = mount(React.createElement(GridFormSelectInput, {
      field: {
        name: 'name',
        options: options,
        type: 'select'
      },
      register: jest.fn(),
      setValue: setValue
    }));
    wrapped.find('select').simulate('change', {
      target: {
        value: options[1]
      }
    });
    expect(setValue).toHaveBeenLastCalledWith(options[1]);
  });
});