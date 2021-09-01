import { mount } from 'enzyme';
import React from 'react';

import { Avatar, defaultAvatarSize } from '..';

describe('Avatar', () => {
  it('when an "alt" prop is passed, an "alt" attribute is added to the <img/>', () => {
    const wrapper = mount(<Avatar src="" alt="alt" />);

    expect(wrapper.find('img[alt="alt"]')).toHaveLength(1);
  });

  it('when an "aria-labelledby" prop is passed, an "aria-labelledby" attribute is added to the <img/>', () => {
    const wrapper = mount(
      <>
        <Avatar src="" aria-labelledby="label" />
        <h1 id="label">I is label</h1>
      </>
    );
    expect(wrapper.find('img[aria-labelledby="label"]')).toHaveLength(1);
  });

  it('when a "size" prop is passed, the <img/> height and width attributes are set accordingly', () => {
    const avatarSize = 666;
    const wrapper = mount(<Avatar src="" alt="" size={avatarSize} />);
    expect(
      wrapper.find(`img[height="${avatarSize}px"][width="${avatarSize}px"]`)
    ).toHaveLength(1);
  });

  it('when a "size" prop is not passed, the <img/> height and width attributes are set to the default value', () => {
    const wrapper = mount(<Avatar src="" alt="" />);
    expect(
      wrapper.find(
        `img[height="${defaultAvatarSize}px"][width="${defaultAvatarSize}px"]`
      )
    ).toHaveLength(1);
  });
});
