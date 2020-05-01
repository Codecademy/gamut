import { RadialProgress } from '@codecademy/gamut/src';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import React from 'react';

import { selectableColors } from '../helpers';
import {
  StoryTemplate,
  StoryStatus,
  StoryDescription,
  decoratedStory,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Atoms/RadialProgress',
  component: RadialProgress,
  decorators: [withKnobs],
};

export const radialProgress = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      A circular display of progress without a number inside, meant to convey a
      percentage out of a whole.
    </StoryDescription>
    <RadialProgress
      style={{ color: select('color', selectableColors, 'black') }}
      size={text('size', '10rem')}
      value={number('value', 30)}
      strokeLinecap={select('strokeLinecap', ['round', 'butt'], 'round')}
      strokeWidth={text('strokeWidth', '10')}
    />
  </StoryTemplate>
));

export const animating = decoratedStory(() => {
  const rendering = boolean('Animating', false);
  const action = rendering ? 'reset the animations' : 'see the animations';

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Given an initial value, end value, and duration, these will animate
        smoothly upon being rendered.
        <br />
        Click on the <code>Animating</code> checkbox below to {action}.
      </StoryDescription>
      <div>
        <RadialProgress size="8rem" value={0} />
        {rendering && (
          <>
            <RadialProgress size="8rem" value={[0, 25]} duration={1000} />
            <RadialProgress size="8rem" value={[25, 66]} duration={1000} />
            <RadialProgress size="8rem" value={[0, 90]} duration={1000} />
            <RadialProgress size="8rem" value={[80, 100]} duration={1000} />
            <RadialProgress size="8rem" value={[0, 100]} duration={3000} />
            <RadialProgress size="8rem" value={[0, 100]} duration={5000} />
          </>
        )}
      </div>
    </StoryTemplate>
  );
});
