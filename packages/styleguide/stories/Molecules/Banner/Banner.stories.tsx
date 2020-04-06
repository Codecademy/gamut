import { Banner, BannerStyle } from '@codecademy/gamut/src';
import { AlertIcon } from '@codecademy/gamut-icons';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import styles from './styles.scss';

export default decoratedStory('Molecules', Banner);

export const defaultBannerFullWidth = () => (
  <StoryTemplate heading="Banner" status={StoryStatus.NotReady}>
    <StoryDescription>
      Full-width banner to indicate important messaging at the top of a page or
      section.
    </StoryDescription>
    <Banner>Some Banner content!</Banner>
  </StoryTemplate>
);

export const defaultBannerWithIconFullWidth = () => (
  <StoryTemplate heading="Banner With Icon" status={StoryStatus.NotReady}>
    <StoryDescription>
      An informative icon can be added to the left of the banner.
    </StoryDescription>
    <Banner icon={<AlertIcon className={styles.icon} />}>
      Some Banner content!
    </Banner>
  </StoryTemplate>
);

export const BannerWithBottomBorder = () => (
  <StoryTemplate heading="Banner With Icon" status={StoryStatus.NotReady}>
    <StoryDescription>
      If your banner is on above similar content (?), add a BannerStyle to it.
    </StoryDescription>
    <Banner displayStyle={BannerStyle.BorderBottom}>
      Some Banner content!
    </Banner>
  </StoryTemplate>
);
