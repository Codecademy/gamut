import {
  Coachmark,
  CoachmarkProps,
  FillButton,
  Text,
} from '@codecademy/gamut/src';
import { useState } from '@storybook/addons';
import React from 'react';

export const CoachmarkExample = (args: CoachmarkProps) => {
  const [shouldShow, setShouldShow] = useState<boolean>(true);

  const renderPopover = () => (
    <div>
      <Text>Clicking me will change my color!</Text>
      <FillButton
        onClick={() => {
          setShouldShow(false);
        }}
      >
        Got it
      </FillButton>
    </div>
  );

  return (
    <React.Fragment>
      <Coachmark
        {...args}
        renderPopover={renderPopover}
        delay={1000}
        shouldShow={shouldShow}
        showOverlay
      >
        <FillButton onClick={() => {}}>Click me</FillButton>
      </Coachmark>
    </React.Fragment>
  );
};
