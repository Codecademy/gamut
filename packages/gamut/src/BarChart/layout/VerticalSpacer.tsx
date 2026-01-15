import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Box } from '../../Box';
import { barListItemPadding } from '../shared/styles';
import { useBarChartContext } from '../utils/hooks';

const SpacerContainer = styled(Box)(
  css({
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: 0,
  })
);

const ContentArea = styled(Box)(
  css({
    flex: 1,
    position: 'relative',
    height: '100%',
  })
);

export interface VerticalSpacerProps {
  children: ReactNode;
  className?: string;
}

const LeftSpacer: React.FC = () => {
  const { widestLeftLabelWidth } = useBarChartContext();
  const width =
    widestLeftLabelWidth === null ? 'min-content' : widestLeftLabelWidth;

  return <Box flexShrink={0} minWidth={width} ml={barListItemPadding} />;
};

const RightSpacer: React.FC = () => {
  const { widestRightLabelWidth } = useBarChartContext();
  const width =
    widestRightLabelWidth === null ? 'min-content' : widestRightLabelWidth;

  return <Box flexShrink={0} minWidth={width} mr={barListItemPadding} />;
};

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
