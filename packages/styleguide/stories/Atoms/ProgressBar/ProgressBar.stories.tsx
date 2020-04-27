import React from 'react';

import { ProgressBar, LayoutGrid, Column } from '@codecademy/gamut/src';
import { colors } from '@codecademy/gamut-styles/utils/variables';

import styles from './styles.module.scss';
import {
  StoryTemplate,
  StoryStatus,
  decoratedStories,
  StoryDescription,
  decoratedStory,
} from '../../Templating';
import { number } from '@storybook/addon-knobs';

export default decoratedStories('Atoms', ProgressBar);

const bars = [
  {
    large: false,
    style: {
      backgroundColor: colors.blue[100],
      barColor: colors.blue[700],
    },
  },
  {
    large: true,
    style: {
      backgroundColor: colors.gray[100],
      barColor: colors.yellow[500],
      fontColor: colors.black,
    },
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
      Bars with <code>large</code> specified are thicker and will display a
      percentage label.
    </StoryDescription>
    <LayoutGrid className={styles.progressBarGrid} columnGap="sm" rowGap="sm">
      {[0, 25, 50, 75, 100].map(percent =>
        bars.map(({ large, style }) => (
          <Column key={[percent, large].join()} size={6}>
            <ProgressBar large={large} percent={percent} style={style} />
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
        style={bars[0].style}
      />
    </StoryTemplate>
  )
);
