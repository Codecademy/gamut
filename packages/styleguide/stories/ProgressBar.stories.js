import React from 'react';

import { ProgressBar } from '../../gamut/src';
import { colors } from '../../gamut-styles/utils/variables';

import styles from './ProgressBar-story.scss';

export default {
  component: ProgressBar,
  title: 'Component/ProgressBar',
};

export const progressbar = () => (
  <div className={styles.sections}>
    ProgressBars are to be used when you would like to indicate a known or
    somewhat-known amount of progress along a fixed course. For example, you
    might show one on a quiz page indicated how many questions have been
    completed.
    <br />
    Styles for the background, bar, and font colors are configurable.
    <div className={styles.section}>
      <h2>Hidden percent</h2>
      By default, they are thin bars that only show progress visully.
      <ProgressBar
        percent={0}
        style={{
          backgroundColor: colors.blue['100'],
          barColor: colors.blue['700'],
        }}
      />
      <ProgressBar
        percent={50}
        style={{
          backgroundColor: colors.green['200'],
          barColor: colors.green['800'],
        }}
      />
      <ProgressBar
        percent={95}
        style={{
          backgroundColor: colors.gray['100'],
          barColor: colors.yellow['500'],
        }}
      />
    </div>
    <div className={styles.section}>
      <h2>Displaying percent</h2>
      You can opt to have them display their percentage progress as a number.
      This increases the height of the bar.
      <ProgressBar
        displayLabel
        percent={0}
        style={{
          backgroundColor: colors.blue['100'],
          barColor: colors.blue['700'],
          fontColor: colors.black,
        }}
      />
      <ProgressBar
        displayLabel
        percent={50}
        style={{
          backgroundColor: colors.green['200'],
          barColor: colors.green['500'],
          fontColor: colors.black,
        }}
      />
      <ProgressBar
        displayLabel
        percent={95}
        style={{
          backgroundColor: colors.gray['100'],
          barColor: colors.yellow['500'],
          fontColor: colors.black,
        }}
      />
    </div>
  </div>
);
