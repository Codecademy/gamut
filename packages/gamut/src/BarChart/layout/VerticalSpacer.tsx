import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Box } from '../../Box';
import { labelAreaTotalWidth, rightSpacerWidth } from '../shared/styles';

const SpacerContainer = styled(Box)(
  css({
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: 0,
  })
);

const LeftSpacer = styled(Box)(
  css({
    flexShrink: 0,
    minWidth: labelAreaTotalWidth,
    pl: 16,
  })
);

const ContentArea = styled(Box)(
  css({
    flex: 1,
    position: 'relative',
    height: '100%',
  })
);

const RightSpacer = styled(Box)(
  css({
    flexShrink: 0,
    width: rightSpacerWidth,
  })
);

export interface VerticalSpacerProps {
  children: ReactNode;
  className?: string;
}

export const VerticalSpacer: React.FC<VerticalSpacerProps> = ({
  children,
  className,
}) => {
  return (
    <SpacerContainer className={className}>
      <LeftSpacer />
      <ContentArea>{children}</ContentArea>
      <RightSpacer />
    </SpacerContainer>
  );
};
