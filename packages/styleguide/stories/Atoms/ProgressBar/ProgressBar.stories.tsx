import React from 'react';

import { ProgressBar, LayoutGrid, Column } from '@codecademy/gamut/src';

import styles from './styles.module.scss';
import {
  StoryTemplate,
  StoryStatus,
  decoratedStories,
  StoryDescription,
  decoratedStory,
} from '../../Templating';
import { number } from '@storybook/addon-knobs';
import { colors } from '@codecademy/gamut-styles/utils/variables';

export default decoratedStories('Atoms', ProgressBar);

const bars = [
  {
    large: false,
    theme: 'blue',
  },
  {
    large: true,
    theme: 'yellow',
  },
] as const;

export const progressBar = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      ProgressBars are to be used when you would like to indicate a known or
      somewhat-known amount of progress along a fixed course. For example, you
      might show one on a quiz page indicating how many questions have been
      completed.
      <br />
      Bars with <code>large</code> specified are thicker, and will display a
      percentage label if a font color is specified.
    </StoryDescription>
    <LayoutGrid className={styles.progressBarGrid} columnGap="sm" rowGap="sm">
      {[0, 25, 50, 75, 100].map(percent =>
        bars.map(({ large, theme }) => (
          <Column key={[percent, large, theme].join()} size={6}>
            <ProgressBar large={large} percent={percent} theme={theme} />
          </Column>
        ))
      )}
    </LayoutGrid>
  </StoryTemplate>
));

export const progressBarMinimumPercent = decoratedStory(
  'Minimum Percentage',
  () => (
    <StoryTemplate status={StoryStatus.InProgress}>
      <StoryDescription>
        Some bars (generally small ones) should display at least a little bit of
        progress, even if the technical progress number is zero. You can use the
        <code>minimumPercent</code> prop for a minimum visual width percentage.
      </StoryDescription>
      <ProgressBar
        minimumPercent={number('Minimum Percent', 5)}
        percent={number('Percent', 0)}
        theme="blue"
      />
    </StoryTemplate>
  )
);

export const progressBarStyleOverrides = decoratedStory(
  'Style Overrides',
  () => (
    <StoryTemplate status={StoryStatus.InProgress}>
      <StoryDescription>
        For the sake of rapid iteration, you can pass in custom style colors via
        the <code>style</code> prop.
      </StoryDescription>
      <ProgressBar
        minimumPercent={number('Minimum Percent', 5)}
        large
        percent={number('Percent', 0)}
        style={{
          backgroundColor: colors.red[900],
          barColor: colors.red[600],
          fontColor: colors.white,
        }}
        theme="blue"
      />
    </StoryTemplate>
  )
);
