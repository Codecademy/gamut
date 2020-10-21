import { mount } from 'enzyme';
import React from 'react';
import { VisualTheme } from '@codecademy/gamut';

import { Quote } from '..';
import styles from '../styles.module.scss';

describe('Quote', () => {
  it('adds the light class to the container as a default', () => {
    const wrapper = mount(<Quote text="Timshel!" />);

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.lightContainer);
  });

  it('adds the light class to the container when its theme is light', () => {
    const wrapper = mount(
      <Quote
        text="The reason I will not exhibit this picture is that I am afraid that I have shown in it the secret of my own soul."
        theme={'light'}
      />
    );

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.lightContainer);
  });

  it('adds the dark class to the container when its theme is dark', () => {
    const wrapper = mount(
      <Quote text="One fish, two fish, red fish, blue fish" theme={'dark'} />
    );

    const containerClassName = wrapper.find(`div`).prop('className');

    expect(containerClassName).toContain(styles.darkContainer);
  });
});
