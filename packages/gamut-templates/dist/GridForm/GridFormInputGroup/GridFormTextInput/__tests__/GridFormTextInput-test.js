import { mount } from 'enzyme';
import React from 'react';
import GridFormTextInput from '..';
describe('GridFormTextInput', function () {
  it('calls setValue when changed', function () {
    var setValue = jest.fn();
    var options = ['aaa', 'bbb'];
    var wrapped = mount(React.createElement(GridFormTextInput, {
      field: {
        name: 'name',
        type: 'text'
      },
      register: jest.fn(),
      setValue: setValue
    }));
    wrapped.find('input').simulate('change', {
      target: {
        value: options[1]
      }
    });
    expect(setValue).toHaveBeenLastCalledWith(options[1]);
  });
});