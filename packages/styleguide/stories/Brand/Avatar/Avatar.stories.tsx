import { Avatar } from '@codecademy/brand-components/src/Avatar';
import { select, text } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import styles from './styles.module.scss';

export default decoratedStories('Brand', Avatar);

export const avatar = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    {theme => (
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
