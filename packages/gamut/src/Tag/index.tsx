import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';
import {
  DismissButton,
  Outline,
  StyledMiniDeleteIcon,
  TagLabelWrapper,
} from './elements';
import { tagBorderRadius, tagLabelFontSize, tagLabelPadding } from './styles';
import { TagProps } from './types';

const StyledFlexBox = styled(FlexBox)(
  css({
    borderRadius: tagBorderRadius,
    // minWidth: '100%',
    width: '100%',
    maxWidth: 'fit-content',
    // display: 'flex',
    // flexDirection: 'row',
    // width:'fit-content',
    '&:focus-within': {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: '2px',
    },
    '&:active': {
      outlineColor: `transparent`,
    }})
)

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  return (
    // <Outline {...rest} >

      <StyledFlexBox flexDirection="row" {...rest}>
        <TagLabelWrapper variant={variant} readOnly={readonly}>
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
        </TagLabelWrapper>
        {!readonly && (
          <DismissButton
            aria-label={`Dismiss ${children} Tag`}
            onClick={onDismiss || undefined}
            tip="Remove"
            tipProps={{ placement: 'floating' }}
            icon={StyledMiniDeleteIcon}
            tagType={variant}
            width='100%'
          />
        )}
      </StyledFlexBox>

    // </Outline>
  );
};
