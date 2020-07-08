import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
import { Quote } from '..';
import styles from '../styles.module.scss';
describe('Quote', function () {
  it('adds the light class to the container as a default', function () {
    var wrapper = mount(React.createElement(Quote, {
      text: "Timshel!"
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.lightContainer);
  });
  it('adds the light class to the container when its theme is light', function () {
    var wrapper = mount(React.createElement(Quote, {
      text: "The reason I will not exhibit this picture is that I am afraid that I have shown in it the secret of my own soul.",
      theme: VisualTheme.LightMode
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.lightContainer);
  });
  it('adds the dark class to the container when its theme is dark', function () {
    var wrapper = mount(React.createElement(Quote, {
      text: "One fish, two fish, red fish, blue fish",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find("div").prop('className');
    expect(containerClassName).toContain(styles.darkContainer);
  });
});