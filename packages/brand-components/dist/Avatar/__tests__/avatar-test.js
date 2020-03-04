import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
import { Avatar } from '..';
import styles from '../../styles.module.scss';
describe('Avatar', function () {
  it('when an "alt" prop is passed, an "alt" attribute is added to the <img/>', function () {
    var wrapper = mount(React.createElement(Avatar, {
      src: "",
      alt: "alt"
    }));
    expect(wrapper.find('img[alt="alt"]')).toHaveLength(1);
  });
  it('when an "aria-labelledby" prop is passed, an "aria-labelledby" attribute is added to the <img/>', function () {
    var wrapper = mount(React.createElement(React.Fragment, null, React.createElement(Avatar, {
      src: "",
      "aria-labelledby": "label"
    }), React.createElement("h1", {
      id: "label"
    }, "I is label")));
    expect(wrapper.find('img[aria-labelledby="label"]')).toHaveLength(1);
  });
  it('adds the light class to the container name as a default', function () {
    var wrapper = mount(React.createElement(Avatar, {
      src: "",
      alt: ""
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.lightContainer);
  });
  it('adds the light class to the container name when its theme is light', function () {
    var wrapper = mount(React.createElement(Avatar, {
      src: "",
      theme: VisualTheme.LightMode,
      alt: ""
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.lightContainer);
  });
  it('adds the dark class to the container name when its theme is dark', function () {
    var wrapper = mount(React.createElement(Avatar, {
      src: "",
      theme: VisualTheme.DarkMode,
      alt: ""
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.darkContainer);
  });
});