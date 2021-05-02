/* eslint-disable local-rules/gamut-import-paths */
import { FillButton } from '@codecademy/gamut/src';
import { Coachmark, CoachmarkProps } from '@codecademy/gamut-labs/src';
import { Background } from '@codecademy/gamut-styles/src';
import React, { useState } from 'react';

export const CoachmarkExample = (args: CoachmarkProps) => {
  const [shouldShow, setShouldShow] = useState(
    args.shouldShow === undefined ? true : args.shouldShow
  );

  return (
    <Background
      bg="navy"
      display="flex"
      height={1}
      width={1}
      minHeight="500px"
      justifyContent="center"
      alignItems="center"
    >
      <Coachmark
        {...args}
        cta={{ ...args?.cta, onClick: () => setShouldShow(false) }}
        delay={0}
        shouldShow={shouldShow}
      >
        <FillButton onClick={() => setShouldShow(true)}>
          {shouldShow ? 'Some New Button' : 'Reset Coachmark'}
        </FillButton>
      </Coachmark>
    </Background>
  );
};
