import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';

import { Testimonial } from '..';
import styles from '../../styles.module.scss';

const exampleTestmonial = {
  name: 'Frank Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  imageUrl: '',
  short_quote:
    "I don't know how many years on this Earth I got left, I'm gonna get real weird with it.",
};

describe('Testimonial', () => {
  it('adds the light class to the wrapper container when its theme is light', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="small"
        theme={VisualTheme.LightMode}
      />
    );

    const containerClassName = wrapper
      .find(`div.lightWrapper`)
      .prop('className');

    expect(containerClassName).toContain(styles.lightWrapper);
  });

  it('adds the dark class to the wrapper container when its theme is dark', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="small"
        theme={VisualTheme.DarkMode}
      />
    );

    const containerClassName = wrapper
      .find(`div.darkWrapper`)
      .prop('className');

    expect(containerClassName).toContain(styles.darkWrapper);
  });

  it('adds the small class to the content container when its size is small', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="small"
        theme={VisualTheme.DarkMode}
      />
    );

    const containerClassName = wrapper
      .find('div.smallContainer')
      .prop('className');

    expect(containerClassName).toContain(styles.smallContainer);
  });

  it('adds the medium class to the content container when its size is medium', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="medium"
        theme={VisualTheme.DarkMode}
      />
    );

    const containerClassName = wrapper
      .find('div.mediumContainer')
      .prop('className');

    expect(containerClassName).toContain(styles.mediumContainer);
  });

  it('adds the large class to the content container when its size is large', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="large"
        theme={VisualTheme.DarkMode}
      />
    );

    const containerClassName = wrapper
      .find('div.largeContainer')
      .prop('className');

    expect(containerClassName).toContain(styles.largeContainer);
  });

  it('renders the Avatar component when an imageUrl prop is present', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        imageUrl="someCoolUrl"
        size="small"
        theme={VisualTheme.DarkMode}
      />
    );

    const avatarContainer = wrapper.find('div.avatarContainer');

    expect(avatarContainer).toHaveLength(1);
  });

  it('does _not_ render the Avatar component when an imageUrl prop is _not_ present', () => {
    const wrapper = mount(
      <Testimonial
        name={exampleTestmonial.name}
        occupation={exampleTestmonial.occupation}
        quote={exampleTestmonial.short_quote}
        size="small"
        theme={VisualTheme.DarkMode}
      />
    );

    const avatarContainer = wrapper.find('div.avatarContainer');

    expect(avatarContainer).toHaveLength(0);
  });
});
