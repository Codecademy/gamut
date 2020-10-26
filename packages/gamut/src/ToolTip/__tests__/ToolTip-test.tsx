import { mount } from 'enzyme';
import React from 'react';

import { VisualTheme } from '../../theming/VisualTheme';
import { ToolTip } from '..';
import styles from '../styles.module.scss';

describe('ToolTip', () => {
  it('adds the dark class to the container name when its theme is dark', () => {
    const wrapper = mount(
      <ToolTip id="test-id" theme={VisualTheme.DarkMode} />
    );

    const containerClassName = wrapper
      .find({ role: 'tooltip' })
      .prop('className');

    expect(containerClassName).toContain(styles.toolTipContainerDark);
  });

  it('adds the light class to the container name when its theme is light', () => {
    const wrapper = mount(
      <ToolTip id="test-id" theme={VisualTheme.LightMode} />
    );

    const containerClassName = wrapper
      .find({ role: 'tooltip' })
      .prop('className');

    expect(containerClassName).toContain(styles.toolTipContainerLight);
  });
});
