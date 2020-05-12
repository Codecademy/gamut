import { BrandMonospace } from '@codecademy/gamut-labs/src/BrandMonospace';
import { Heading } from '@codecademy/gamut/src';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import styles from './styles.module.scss';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../../Templating';

export default {
  title: 'Labs|Brand/Atoms/BrandMonospace',
  component: BrandMonospace,
  decorators: [withKnobs],
};

export const robotoMono = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      A wrapper component that will style text with the
      <BrandMonospace> Robot Mono</BrandMonospace>
      font. Currently, Codecademy uses
      <span className={styles.monacoFont}> Monaco </span> as our default
      monospaced font. However, there are a few brand related instances where we
      are experimenting with using
      <BrandMonospace> Roboto Mono</BrandMonospace>.
    </StoryDescription>
    <BrandMonospace>
      <Heading fontSize="xl" as="h1">
        Roboto Mono
      </Heading>
      <Heading fontSize="lg" as="h2">
        {text('text', 'The quick brown fox jumps over the lazy dog')}
      </Heading>
    </BrandMonospace>
    <Heading fontSize="xl" as="h1" className={styles.monacoFont}>
      Monaco
    </Heading>
    <Heading fontSize="lg" as="h2">
      {text('text', 'The quick brown fox jumps over the lazy dog')}
    </Heading>
  </StoryTemplate>
));
