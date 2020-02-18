import React from 'react';
import { mount } from 'enzyme';
import Toast from '../Toast';

describe('Toast', () => {
  const onClick = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without exploding', () => {
    const renderedToast = mount(<Toast onClose={() => {}} />);
    expect(renderedToast).toBeDefined();
  });

  it('can click the close callback', () => {
    const renderedToast = mount(<Toast onClose={onClose}>Hello</Toast>);
    renderedToast
      .find(`Button`)
      .at(1)
      .simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('can click the content for a click callback', () => {
    const renderedToast = mount(
      <Toast onClick={onClick} onClose={onClose}>
        Hello
      </Toast>
    );
    renderedToast
      .find(`Button`)
      .at(0)
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('can set an icon', () => {
    const renderedToast = mount(
      <Toast icon={<div id="myIcon"></div>} onClose={onClose} />
    );

    expect(renderedToast.find('#myIcon').length).toBe(1);
  });
});
