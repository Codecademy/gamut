import { Icon, ToolTip, ToolTipPosition } from '@codecademy/gamut/src';
import { select } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Atoms/ToolTip',
  component: ToolTip,
  decorators: [withKnobs],
};

export const toolTip = decoratedStory(() => {
  const position = select(
    'Position',
    [
      ToolTipPosition.TopLeft,
      ToolTipPosition.TopRight,
      ToolTipPosition.BottomRight,
      ToolTipPosition.BottomLeft,
    ],
    ToolTipPosition.TopLeft
  );

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      {(theme) => (
        <>
          <StoryDescription>
            Small piece of extra information triggered on the focus or hover of
            a button or icon, such as extra requirements for a form surfaced
            from an informative (i) icon. They dissapear when the focus or hover
            are no longer active.
            <br />
            Tooltips cannot contain clickable elements (if your solution
            requires clickable elements, we suggest using a “Popover” instead)
            <br /> - Great for surfacing additional information that may or may
            not be relevant <em>without</em> cluttering the core interface.
          </StoryDescription>
          <div>
            Hover the icon at the end of the sentence below to view a tooltip.
            <br />
            When the tooltip is hidden, it&apos;s as if it doesn&apos;t exist.
          </div>
          Your billing cycle is each antantwig.
          <ToolTip
            focusable
            id="tooltip"
            target={<Icon name="informational" size={24} />}
            theme={theme}
            position={position}
          >
            Like the term <em>fortnight</em>, a term for a two week period,{' '}
            <em>antantwig</em> refers to a three week period.
          </ToolTip>
        </>
      )}
    </StoryTemplate>
  );
});
