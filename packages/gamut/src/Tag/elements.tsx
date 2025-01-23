import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { Box, FlexBox } from '../Box';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import {
  anchorVariants,
  dismissButtonStyling,
  miniDeleteIconVariants,
  outlineStates,
  outlineStyling,
  sizeVariants,
  tagTextStyling,
  tagUsageVariants,
  tagWrapperStates,
} from './styles';
import { BaseTagProps, TagAnchorProps, tagProps, TagTextProps } from './types';

export const Outline = styled(FlexBox)(
  outlineStyling,
  outlineStates
);

export const TagLabelWrapper = styled(Box)<BaseTagProps>(
  tagProps,
  tagUsageVariants,
  tagWrapperStates,
);

export const DismissButton = styled(IconButton)(
  dismissButtonStyling
);

export const StyledMiniDeleteIcon = styled(MiniDeleteIcon)(
  miniDeleteIconVariants
);

export const TagAnchor = styled(Anchor)<TagAnchorProps>(
  anchorVariants,
  sizeVariants,
)

export const TagText = styled(Text)<TagTextProps>(
  tagTextStyling,
  sizeVariants
)
