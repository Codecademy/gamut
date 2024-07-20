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

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  return (
    <Outline {...rest}>
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
      </TagWrapper>
    </Outline>
  );
};
