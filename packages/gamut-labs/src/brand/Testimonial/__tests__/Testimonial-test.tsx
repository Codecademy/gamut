import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';

import { Testimonial } from '..';
import styles from '../../styles.module.scss';

const exampleTestmonial = {
  firstName: 'Frank',
  lastName: 'Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  quote:
    "I don't know how many years on this Earth I got left, I'm gonna get real weird with it.",
};

describe('Testimonial', () => {
  it('adds the light class to the wrapper container when its theme is light', () => {
    const wrapper = mount(
      <Testimonial
        testimonial={exampleTestmonial}
        size="small"
        theme={'light'}
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
        testimonial={exampleTestmonial}
        size="small"
        theme={'dark'}
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
        testimonial={exampleTestmonial}
        size="small"
        theme={'dark'}
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
        testimonial={exampleTestmonial}
        size="medium"
        theme={'dark'}
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
        testimonial={exampleTestmonial}
        size="large"
        theme={'dark'}
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
        testimonial={{ ...exampleTestmonial, imageUrl: 'someCoolUrl' }}
        size="small"
        theme={'dark'}
      />
    );

    const avatarContainer = wrapper.find('div.avatarContainer');

    expect(avatarContainer).toHaveLength(1);
  });

  it('does _not_ render the Avatar component when an imageUrl prop is _not_ present', () => {
    const wrapper = mount(
      <Testimonial
        testimonial={exampleTestmonial}
        size="small"
        theme={'dark'}
      />
    );

    const avatarContainer = wrapper.find('div.avatarContainer');

    expect(avatarContainer).toHaveLength(0);
  });
});
