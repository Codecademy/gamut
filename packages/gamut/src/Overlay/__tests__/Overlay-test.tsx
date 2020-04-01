import React from 'react';
import { mount } from 'enzyme';

import Overlay from '..';

describe('Overlay', () => {
  it('renders null when isOpen is not true', () => {
    const wrapper = mount(
      <Overlay>
        <div>
          Howdy!
          <button type="button" />
        </div>
      </Overlay>
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders children when isOpen is true', () => {
    const children = 'Howdy!';
    const wrapper = mount(
      <Overlay isOpen>
        <div>
          {children}
          <button type="button" />
        </div>
      </Overlay>
    );

    expect(wrapper.text()).toEqual(children);
  });
});
