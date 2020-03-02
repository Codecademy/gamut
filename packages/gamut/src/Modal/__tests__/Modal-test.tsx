import React from 'react';
import { mount } from 'enzyme';

import Modal from '..';

describe('Modal', () => {
  it('renders null when isOpen is not true', () => {
    const wrapper = mount(
      <Modal>
        Howdy!
        <button type="button" />
      </Modal>
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders children when isOpen is true', () => {
    const children = 'Howdy!';
    const wrapper = mount(
      <Modal isOpen>
        {children}
        <button type="button" />
      </Modal>
    );

    expect(wrapper.text()).toEqual(children);
  });
});
