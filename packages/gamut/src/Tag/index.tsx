import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { Text } from '../Typography';
import {
  DismissButton,
  Outline,
  StyledMiniDeleteIcon,
  TagWrapper,
} from './elements';
import { tagLabelFontSize, tagLabelPadding } from './styles';
import { TagProps } from './types';
import { ToolTip } from '../Tip';
import { Box, FlexBox } from '../Box';

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  return (
    <Outline {...rest}>
      <FlexBox >
        <TagWrapper variant={variant}>
          <Text
            as="span"
            fontSize={tagLabelFontSize}
            lineHeight={1 as any}
            px={tagLabelPadding}
            truncate="ellipsis"
            truncateLines={1}
          >
            {children}
          </Text>
        </TagWrapper>
        {/* {!readonly && (
          <ToolTip id="dismiss-button" placement="floating" info="Test">
            <DismissButton
              aria-label={`Dismiss ${children} Tag`}
              onClick={onDismiss || undefined}
              aria-describedby='dismiss-button'
            >
              <MiniDeleteIcon size={12} color="inherit" />
            </DismissButton>
          </ToolTip>
        )} */}
        {!readonly && (
          <DismissButton
          aria-label={`Dismiss ${children} Tag`}
          onClick={onDismiss || undefined}
          tip="Remove"
          tipProps={{ placement: 'floating' }}
          icon={StyledMiniDeleteIcon}
          tagType={variant}
         />
        )}
      </FlexBox>
    </Outline>
  );
};
