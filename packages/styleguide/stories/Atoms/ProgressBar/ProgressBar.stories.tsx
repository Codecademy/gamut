import React from 'react';

import { ProgressBar, LayoutGrid, Column } from '@codecademy/gamut/src';
import { colors } from '@codecademy/gamut-styles/utils/variables';

import styles from './styles.module.scss';
import {
  StoryTemplate,
  StoryStatus,
  decoratedStory,
  StoryDescription,
} from '../../Templating';

export default decoratedStory('Atoms', ProgressBar);

const bars = [
  {
    displayLabel: false,
    style: {
      backgroundColor: colors.blue[100],
      barColor: colors.blue[700],
    },
  },
  {
    displayLabel: true,
    style: {
      backgroundColor: colors.gray[100],
      barColor: colors.yellow[500],
      fontColor: colors.black,
    },
  },
];

export const progressBar = () => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      ProgressBars are to be used when you would like to indicate a known or
      somewhat-known amount of progress along a fixed course. For example, you
      might show one on a quiz page indicating how many questions have been
      completed.
      <br />
      Bars that <code>displayLabel</code> are thicker, and will display a
      percentage label if a font color is specified.
    </StoryDescription>
    <LayoutGrid className={styles.progressBarGrid} columnGap="sm" rowGap="sm">
      {[0, 25, 50, 75, 100].map(percent =>
        bars.map(({ displayLabel, style }) => (
          <Column key={[percent, displayLabel, style].join()} size={6}>
            <ProgressBar percent={percent} style={style} />
          </Column>
        ))
      )}
    </LayoutGrid>
  </StoryTemplate>
);
