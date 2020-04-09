import { Avatar } from '@codecademy/brand-components/src/Avatar';
import { select } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import styles from './styles.module.scss';

export default decoratedStory('Brand', Avatar);

export const avatar = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    {theme => (
      <>
        <StoryDescription>
          Small, circular profile photo that includes a colored drop shadow.
          Commonly paired with a <code>Byline</code>.
        </StoryDescription>
        <Avatar
          src="https://content.codecademy.com/courses/free/boba.svg"
          alt="The Codey character drinking Boba tea"
          className={select(
            'className',
            ['', styles.largeContainerOverride],
            ''
          )}
          theme={theme}
        />
      </>
    )}
  </StoryTemplate>
);
