import { Overlay } from '@codecademy/gamut/src';
import React, { useState } from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStories('Atoms', Overlay);

export const overlay = () => <OverlayStory />;

const OverlayStory = decoratedStory(() => {
  const [open, setOpen] = useState(false);
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Overlay primitives are controlled components that are told whether
        they&apos;re open by their parent. They&apos;re very basic and
        don&apos;t have animations defined.
        <br />
        Unlike the legacy <code>Modal</code> implementations in the monolith,
        this:
        <ul>
          <li>
            always assumes viewport is locked, by making content{' '}
            <code>position: fixed</code>
          </li>
          <li>
            cannot override contentProps, animation, or shouldFocusOnMount
          </li>
        </ul>
        Use this overlay only for actual &apos;overlay&apos; content that takes
        up the full screen. Do not use it for dropdowns or other small
        interactive items.
        <br />
        Note that this atom does not come with styles defined. If you need
        styles such as a background behind content, see <code>Modal</code>.
      </StoryDescription>
      <br />
      <button onClick={() => setOpen(true)} type="button">
        Open overlay
      </button>
      <Overlay clickOutsideDeactivates isOpen={open}>
        <div>
          <h1>Hooray!</h1>
          <button type="button" onClick={() => setOpen(false)}>
            Close overlay
          </button>
        </div>
      </Overlay>
    </StoryTemplate>
  );
});
