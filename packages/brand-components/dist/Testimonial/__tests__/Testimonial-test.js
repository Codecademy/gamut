import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
import { Testimonial } from '..';
import styles from '../../styles.module.scss';
var exampleTestmonial = {
  name: 'Frank Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  imageUrl: '',
  quote: "I don't know how many years on this Earth I got left, I'm gonna get real weird with it."
};
describe('Testimonial', function () {
  it('adds the light class to the container name when its theme is light', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.LightMode
    }));
    var containerClassName = wrapper.find("div").first().prop('className');
    expect(containerClassName).toContain(styles.lightWrapper);
  });
  it('adds the dark class to the container name when its theme is dark', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find("div").first().prop('className');
    expect(containerClassName).toContain(styles.darkWrapper);
  });
});