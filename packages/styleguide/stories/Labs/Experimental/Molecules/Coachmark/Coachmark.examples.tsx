import { FillButton, FlexBox } from '@codecademy/gamut/src';
import { Coachmark, CoachmarkProps, Text } from '@codecademy/gamut-labs/src';
import React, { useState } from 'react';

export const CoachmarkExample = (args: CoachmarkProps) => {
  const [shouldShow, setShouldShow] = useState(
    args.shouldShow === undefined ? true : args.shouldShow
  );

  const renderPopover = () => (
    <FlexBox flexDirection="column" padding={16} alignItems="flex-start">
      <Text marginBottom={8}>You should click the button.</Text>
      <FillButton
        onClick={() => {
          setShouldShow(false);
        }}
        size="small"
      >
        Got it
      </FillButton>
    </FlexBox>
  );

  return (
    <Coachmark
      {...args}
      delay={0}
      renderPopover={renderPopover}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => {}}>A Button</FillButton>
    </Coachmark>
  );
};
