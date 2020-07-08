function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
import { Testimonial } from '..';
import styles from '../../styles.module.scss';
var exampleTestmonial = {
  firstName: 'Frank',
  lastName: 'Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  quote: "I don't know how many years on this Earth I got left, I'm gonna get real weird with it."
};
describe('Testimonial', function () {
  it('adds the light class to the wrapper container when its theme is light', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.LightMode
    }));
    var containerClassName = wrapper.find("div.lightWrapper").prop('className');
    expect(containerClassName).toContain(styles.lightWrapper);
  });
  it('adds the dark class to the wrapper container when its theme is dark', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find("div.darkWrapper").prop('className');
    expect(containerClassName).toContain(styles.darkWrapper);
  });
  it('adds the small class to the content container when its size is small', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find('div.smallContainer').prop('className');
    expect(containerClassName).toContain(styles.smallContainer);
  });
  it('adds the medium class to the content container when its size is medium', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "medium",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find('div.mediumContainer').prop('className');
    expect(containerClassName).toContain(styles.mediumContainer);
  });
  it('adds the large class to the content container when its size is large', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "large",
      theme: VisualTheme.DarkMode
    }));
    var containerClassName = wrapper.find('div.largeContainer').prop('className');
    expect(containerClassName).toContain(styles.largeContainer);
  });
  it('renders the Avatar component when an imageUrl prop is present', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: _objectSpread({}, exampleTestmonial, {
        imageUrl: 'someCoolUrl'
      }),
      size: "small",
      theme: VisualTheme.DarkMode
    }));
    var avatarContainer = wrapper.find('div.avatarContainer');
    expect(avatarContainer).toHaveLength(1);
  });
  it('does _not_ render the Avatar component when an imageUrl prop is _not_ present', function () {
    var wrapper = mount(React.createElement(Testimonial, {
      testimonial: exampleTestmonial,
      size: "small",
      theme: VisualTheme.DarkMode
    }));
    var avatarContainer = wrapper.find('div.avatarContainer');
    expect(avatarContainer).toHaveLength(0);
  });
});