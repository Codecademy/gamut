import { Banner, BannerStyle } from '@codecademy/gamut/src';
import { AlertIcon } from '@codecademy/gamut-icons';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import styles from './styles.module.scss';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Molecules/Banner',
  component: Banner,
  decorators: [withKnobs],
};

export const defaultBannerFullWidth = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.NotReady}>
    <StoryDescription>
      Full-width banner to indicate important messaging at the top of a page or
      section.
    </StoryDescription>
    <Banner onClose={action('Banner closed.')}>Some Banner content!</Banner>
  </StoryTemplate>
));

export const defaultBannerWithIconFullWidth = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.NotReady}>
    <StoryDescription>
      An informative icon can be added to the left of the banner.
    </StoryDescription>
    <Banner
      icon={<AlertIcon className={styles.icon} />}
      onClose={action('Banner closed.')}
    >
      Some Banner content!
    </Banner>
  </StoryTemplate>
));

export const BannerWithBottomBorder = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.NotReady}>
    <StoryDescription>
      If your banner is on above similar content (?), add a BannerStyle to it.
    </StoryDescription>
    <Banner
      displayStyle={BannerStyle.BorderBottom}
      onClose={action('Banner closed.')}
    >
      Some Banner content!
    </Banner>
  </StoryTemplate>
));
