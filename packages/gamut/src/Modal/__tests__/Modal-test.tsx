import React from 'react';
import { mount } from 'enzyme';
import { Overlay } from '../../Overlay';
import Modal from '..';

describe('Modal', () => {
  it('renders children when isOpen is true', () => {
    const children = 'Hey';
    const wrapper = mount(<Modal isOpen>{children}</Modal>);

    expect(wrapper.text()).toContain(children);
  });

  it('does not render when isOpen is false', () => {
    const wrapper = mount(<Modal isOpen={false}>Hey</Modal>);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('does not render its close button if hideDefaultCloseButton is true', () => {
    const wrapper = mount(
      <Modal isOpen hideDefaultCloseButton>
        I got my own close button
        <button type="button" />
      </Modal>
    );

    expect(
      wrapper.find(`[data-testid="modal-default-close-button"]`)
    ).toHaveLength(0);
  });

  it('renders its close button if hideDefaultCloseButton is false', () => {
    const wrapper = mount(<Modal isOpen>I use the default close button</Modal>);

    expect(
      wrapper.find(`[data-testid="modal-default-close-button"]`)
    ).toHaveLength(1);
  });

  it('passes truthy clickOutsideCloses option to Overlay', () => {
    const wrapper = mount(
      <Modal clickOutsideCloses isOpen>
        When you click the overlay I will close!
      </Modal>
    );

    expect(wrapper.find(Overlay).props().clickOutsideCloses).toBeTruthy();
  });

  it('passes falsy clickOutsideCloses option to Overlay', () => {
    const wrapper = mount(
      <Modal clickOutsideCloses={false} isOpen>
        When you click the overlay I will not close!
      </Modal>
    );

    expect(wrapper.find(Overlay).props().clickOutsideCloses).toBeFalsy();
  });
});
