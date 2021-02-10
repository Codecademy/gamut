import { FillButton, Text } from '@codecademy/gamut/src';
import { Coachmark, CoachmarkProps } from '@codecademy/gamut-labs/src';
import styled from '@emotion/styled';
import { useState } from '@storybook/addons';
import React from 'react';

export const CoachmarkExample = (args: CoachmarkProps) => {
  const [shouldShow, setShouldShow] = useState<boolean>(true);

  const Container = styled.div`
    padding: 0.5rem;
  `;

  const renderPopover = () => (
    <Container>
      <Text>You should really click me</Text>
      <FillButton
        onClick={() => {
          setShouldShow(false);
        }}
      >
        Got it
      </FillButton>
    </Container>
  );

  return (
    <React.Fragment>
      <Coachmark
        {...args}
        renderPopover={renderPopover}
        delay={1000}
        shouldShow={shouldShow}
      >
        <FillButton onClick={() => {}}>Click me</FillButton>
      </Coachmark>
    </React.Fragment>
  );
};
