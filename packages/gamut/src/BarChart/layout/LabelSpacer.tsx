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

export interface LabelSpacerProps {
  children: ReactNode;
  className?: string;
}

const PreLabelSpacer: React.FC = () => {
  const { widestCategoryLabelWidth } = useBarChartContext();
  const width =
    widestCategoryLabelWidth === null
      ? 'min-content'
      : widestCategoryLabelWidth;

  return <Box flexShrink={0} minWidth={width} ml={barListItemPadding} />;
};

const PostLabelSpacer: React.FC = () => {
  const { widestTotalValueLabelWidth } = useBarChartContext();
  const width =
    widestTotalValueLabelWidth === null
      ? 'min-content'
      : widestTotalValueLabelWidth;

  return <Box flexShrink={0} minWidth={width} mr={barListItemPadding} />;
};

export const LabelSpacer: React.FC<LabelSpacerProps> = ({
  children,
  className,
}) => {
  return (
    <SpacerContainer className={className}>
      <PreLabelSpacer />
      <ContentArea>{children}</ContentArea>
      <PostLabelSpacer />
    </SpacerContainer>
  );
};
