import React from 'react';

import { SkipToContent } from '@codecademy/gamut/src';
import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStories('Atoms', SkipToContent);

export const skipToContent = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      A hidden-by-default link that becomes visible when the user <kbd>Tab</kbd>
      s over it (gives it focus). This type of control is necessary for pages
      that have a bunch of stuff keyboard users would have to Tab through to get
      to the page's main content. It takes in the ID of the elemnt it scrolls to
      and focuses (
      <a href="https://dev.to/robdodson/managing-focus-64l">
        dev.to article explaining why
      </a>
      ) .
      <br />
      To see it, keep tabbing around on this page.
    </StoryDescription>
    <SkipToContent contentId="example" />
  </StoryTemplate>
));
