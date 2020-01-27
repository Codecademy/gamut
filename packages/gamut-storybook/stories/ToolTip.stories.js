import React from 'react';
import { ToolTip, Button } from '../../gamut/src';
import { select } from '@storybook/addon-knobs';
import Icon from '../../gamut/src/Icon';
import { VisualTheme } from '../../gamut/src/theming/VisualTheme';

export default {
  component: ToolTip,
  title: 'Component/ToolTip',
};

export const toolTip = () => (
  <div>
    <div style={{ marginTop: '3rem' }}>
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
    <div style={{ margin: '2rem 0' }}>
      <div>
        It even supports a fancy dark mode too!
        <ToolTip
          focusable
          id="tooltip-dark"
          target={<Icon name="informational" size={24} />}
          theme={VisualTheme.DarkMode}
          position={select(
            'position',
            ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            'bottom-left'
          )}
        >
          Dark mode has black background and white text.
        </ToolTip>
      </div>
    </div>
    <div>
      <div>
        Top left
        <ToolTip
          focusable
          id="tooltip-top-left"
          target={<Icon name="informational" size={24} />}
          position="top-left"
        >
          One fish...
        </ToolTip>
      </div>
      <div>
        Top right
        <ToolTip
          focusable
          id="tooltip-top-right"
          target={<Icon name="informational" size={24} />}
          position="top-right"
        >
          Two fish; red fish; blue fish...
        </ToolTip>
      </div>
      <div>
        Bottom left
        <ToolTip
          focusable
          id="tooltip-bottom-left"
          target={<Icon name="informational" size={24} />}
          position="bottom-left"
        >
          One fish...
        </ToolTip>
      </div>
      <div>
        Bottom right
        <ToolTip
          focusable
          id="tooltip-bottom-right"
          target={<Icon name="informational" size={24} />}
          position="bottom-right"
        >
          Two fish; red fish; blue fish...
        </ToolTip>
      </div>
    </div>
    <div style={{ padding: '1rem 0 7rem' }}>
      <div>
        Non-Focusable
        <ToolTip
          id="tooltip-overlapping"
          target={<Button>Hi!</Button>}
          position="top-right"
        >
          If the contents of the tooltip are themselves focusable, such as with
          buttons, do not pass the <code>focusable</code> prop.
        </ToolTip>
      </div>
      <div>
        Overlapping content
        <ToolTip
          focusable
          id="tooltip-overlapping"
          target={
            <Icon
              name="informational"
              size={30}
              style={{ margin: '1.5rem 0 -1.5rem' }}
            />
          }
          position="bottom-right"
        >
          Hovering the mouse over a tooltip keeps it visible even if focus is
          moved away from its target. That is particularly necessary for
          tooltips that overlap content.
        </ToolTip>
      </div>
    </div>
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
