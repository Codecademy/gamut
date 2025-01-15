import * as React from 'react';

import { Anchor } from '../Anchor';
import { FlexBox } from '../Box';
import { Text } from '../Typography';
import {
  DefaultMiniDeleteIcon,
  DismissButton,
  LargeMiniDeleteIcon,
  Outline,
  TagLabelWrapper,
} from './elements';
import { tagLabelFontSize } from './styles';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  size,
  ...rest
}) => {
  const isSelectionVariant = variant === 'selection';

  return (
    <Outline {...rest}>
      <FlexBox
        flexDirection="row"
        {...rest}
        width={isSelectionVariant ? 'calc(100% - 24px)' : 'fit-content' }
      >
        <TagLabelWrapper variant={variant} readOnly={readonly} size={size}>
          {/* KENNY: would need to add some icon logic here (and props as well)  */}
          {variant === 'navigation' || variant === 'suggestion' ?
            <Anchor variant="interface">
              {children}
            </Anchor> :
            <Text
              as="span"
              fontSize={tagLabelFontSize}
              lineHeight={1 as any}
              // px={tagLabelPadding}
              // Would this be some state now?
              // maybe Text will have to be a separate element as well that
              truncate="ellipsis"
              truncateLines={1}
            >
              {children}
            </Text>
          }

        </TagLabelWrapper>
        {isSelectionVariant && (
          <DismissButton
            aria-label={`Dismiss ${children} Tag`}
            onClick={onDismiss || undefined}
            tip="Remove"
            tipProps={{ placement: 'floating' }}
            icon={size === 'large' ? LargeMiniDeleteIcon : DefaultMiniDeleteIcon}
            width="100%"
          />
        )}
      </FlexBox>
    </Outline>
  );
};
