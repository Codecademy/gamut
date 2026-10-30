import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import React from 'react';

export type HeroContainerProps = FlexBoxProps;

// Teams landing page hero wrapper: flex column, 16px padding on all sides,
// 24px margin-top, and white text color — all expressed as system props
// directly on FlexBox rather than a styled() wrapper (Box already exposes
// these as props, so there's nothing left to hand-write in CSS).
export const HeroContainer: React.FC<HeroContainerProps> = ({
  children,
  ...props
}) => (
  <FlexBox flexDirection="column" p={16} mt={24} color="white" {...props}>
    {children}
  </FlexBox>
);
