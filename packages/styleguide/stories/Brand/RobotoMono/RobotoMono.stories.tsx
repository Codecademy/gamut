import { RobotoMono } from '@codecademy/brand-components/src/RobotoMono';
import { Heading } from '@codecademy/gamut/src';
import { text } from '@storybook/addon-knobs';
import React from 'react';

import styles from './styles.module.scss';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';

export default decoratedStories('Brand', RobotoMono);

export const robotoMono = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      A wrapper component that will style text with the
      <RobotoMono> Robot Mono</RobotoMono>
      font. Currently, Codecademy uses
      <span className={styles.monacoFont}> Monaco </span> as our default
      monospaced font. However, there are a few brand related instances where we
      are experimenting with using
      <RobotoMono> Roboto Mono</RobotoMono>.
    </StoryDescription>
    <RobotoMono>
      <Heading fontSize="xl" as="h1">
        Roboto Mono
      </Heading>
      <Heading fontSize="lg" as="h2">
        {text('text', 'The quick brown fox jumps over the lazy dog')}
      </Heading>
    </RobotoMono>
    <Heading fontSize="xl" as="h1" className={styles.monacoFont}>
      Monaco
    </Heading>
    <Heading fontSize="lg" as="h2">
      {text('text', 'The quick brown fox jumps over the lazy dog')}
    </Heading>
  </StoryTemplate>
));
