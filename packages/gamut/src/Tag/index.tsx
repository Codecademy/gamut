import * as React from 'react';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import {
  DismissButton,
  Outline,
  StyledMiniDeleteIcon,
  TagLabelWrapper,
} from './elements';
import { tagLabelFontSize, tagLabelPadding } from './styles';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  return (
    <Outline {...rest}>
      <FlexBox
        flexDirection="row"
        {...rest}
        width={readonly ? 'fit-content' : 'calc(100% - 24px)'}
      >
        <TagLabelWrapper variant={variant} readOnly={readonly}>
          {/* KENNY: would need to add some icon logic here (and props as well)  */}
          <Text
            as="span"
            fontSize={tagLabelFontSize}
            lineHeight={1 as any}
            px={tagLabelPadding}
            // Would this be some state now?
            // maybe Text will have to be a separate element as well that 
            truncate="ellipsis"
            truncateLines={1}
          >
            {children}
          </Text>
        </TagLabelWrapper>
        {!readonly && (
          <DismissButton
            aria-label={`Dismiss ${children} Tag`}
            onClick={onDismiss || undefined}
            tip="Remove"
            tipProps={{ placement: 'floating' }}
            icon={StyledMiniDeleteIcon}
            tagType={variant}
            width="100%"
          />
        )}
      </FlexBox>
    </Outline>
  );
};
