import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { Box, FlexBox } from '../Box';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import {
  anchorSizeVariants,
  anchorVariants,
  defaultminiDeleteIconStyling,
  dismissButtonLargeStyling,
  dismissButtonStyling,
  largeMiniDeleteIconStyling,
  outlineStates,
  outlineStyling,
  tagTextStyling,
  tagUsageVariants,
  tagWrapperStates,
  textSizeVariants,
} from './styles';
import { BaseTagProps, DismissButtonProps, TagAnchorProps, tagProps, TagTextProps } from './types';

export const Outline = styled(FlexBox)(
  outlineStyling,
  outlineStates
);

export const TagLabelWrapper = styled(Box)<BaseTagProps>(
  tagProps,
  tagUsageVariants,
  tagWrapperStates,
);

export const DismissButton = styled(IconButton)<DismissButtonProps>(
  dismissButtonStyling,
  dismissButtonLargeStyling
);

export const TagAnchor = styled(Anchor)<TagAnchorProps>(
  anchorVariants,
  anchorSizeVariants,
)

export const TagText = styled(Text)<TagTextProps>(
  tagTextStyling,
  textSizeVariants
)

export const DefaultMiniDeleteIcon = styled(MiniDeleteIcon)(
  defaultminiDeleteIconStyling
);
export const LargeMiniDeleteIcon = styled(MiniDeleteIcon)(
  largeMiniDeleteIconStyling
);
