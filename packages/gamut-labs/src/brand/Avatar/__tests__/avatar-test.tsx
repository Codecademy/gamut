import { VisualTheme } from '@codecademy/gamut';
import { mount } from 'enzyme';
import React from 'react';

import styles from '../../styles.module.scss';
import { Avatar } from '..';

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

  it('adds the light class to the container name as a default', () => {
    const wrapper = mount(<Avatar src="" alt="" />);

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.lightContainer);
  });

  it('adds the light class to the container name when its theme is light', () => {
    const wrapper = mount(<Avatar src="" theme="light" alt="" />);

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.lightContainer);
  });

  it('adds the dark class to the container name when its theme is dark', () => {
    const wrapper = mount(<Avatar src="" theme="dark" alt="" />);

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.darkContainer);
  });
});
