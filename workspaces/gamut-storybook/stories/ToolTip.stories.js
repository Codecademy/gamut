import React from 'react';
import { ToolTip } from 'gamut';
import { select } from '@storybook/addon-knobs';
import Icon from 'gamut/Icon';

export default {
  component: ToolTip,
  title: 'Component/ToolTip',
};

export const toolTip = () => (
  <div style={{ margin: '7rem 0' }}>
    <p>Hover the icon at the end of the sentence below to view a tooltip.</p>
    Your billing cycle is each antantwig.
    <ToolTip
      id="tooltip"
      target={<Icon name="informational" size={24} />}
      position={select(
        'position',
        ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        'top-right'
      )}
    >
      Like the term <em>fortnight</em>, a term for a two week period,{' '}
      <em>antantwig</em> refers to a three week period.
    </ToolTip>
  </div>
);

toolTip.story = {
  name: 'ToolTip',

  description: `
  **Usage:**

  - Triggered on hover of an icon, usually the (i) icon

  - Disappears when hover is no longer active

  - Tooltips cannot contain clickable elements (if your solution requires clickable elements, we suggest using a “Popover” instead)

  - Tooltips are always left-aligned with the element they appear from and can appear in a top-left, top-right, bottom-left, bottom-right position

  - Tooltips use center-aligned h5 text and maintain 16px of padding around the text on all sides

  - Great for surfacing additional information that may or may not be relevant depending on the experience level of the user

  - Great for surfacing additional information without cluttering the core interface
`,
};
