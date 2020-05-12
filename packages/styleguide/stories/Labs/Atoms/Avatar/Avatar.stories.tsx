import { Avatar } from '@codecademy/gamut-labs/src';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import styles from './styles.module.scss';
import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../../Templating';

export default {
  title: 'Labs|Brand/Atoms/Avatar',
  component: Avatar,
  decorators: [withKnobs],
};

export const avatar = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    {(theme) => (
      <>
        <StoryDescription>
          Small, circular profile photo that includes a colored drop shadow.
          Commonly paired with a <code>Byline</code>.
        </StoryDescription>
        <Avatar
          alt={text('Image Alt', 'The Codey character drinking Boba tea')}
          className={select(
            'className',
            ['', styles.largeContainerOverride],
            ''
          )}
          src={text(
            'Source URL',
            'https://content.codecademy.com/courses/free/boba.svg'
          )}
          theme={theme}
        />
      </>
    )}
  </StoryTemplate>
));
