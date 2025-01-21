import * as React from 'react';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import {
  DefaultMiniDeleteIcon,
  DismissButton,
  LargeMiniDeleteIcon,
  Outline,
  TagAnchor,
  TagLabelWrapper,
} from './elements';
import { tagLabelFontSize } from './styles';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'readOnly',
  readonly,
  onDismiss,
  href = undefined,
  onClick,
  disabled=true,
  size,
  ...rest
}) => {
  const isSelectionVariant = variant === 'selection';
  const isSuggestionVariant = variant === 'suggestion';
  const isNavigationVariant = variant === 'navigation';
  const isInteractive = isSuggestionVariant || isNavigationVariant;

  return (
    <Outline disabled={disabled} {...rest}>
      <FlexBox
        flexDirection="row"
        {...rest}
        // KENNY: this needs some guidance, what should the width be for truncation or overflow?
        width={isSelectionVariant ? 'calc(100% - 24px)' : 'fit-content' }

      >
        <TagLabelWrapper variant={variant} size={size} overflow={isInteractive ? 'hidden' : 'visible'} disabled={disabled}>
          {/* KENNY: would need to add some icon logic here (and props as well)  */}
          {variant && (variant === 'navigation' || variant === 'suggestion') ?
            <TagAnchor interactiveType={variant} onClick={onClick} href={!disabled ? href : ''} disabled={disabled}>
              {children}
            </TagAnchor> :
            <Text
              as="span"
              fontSize={tagLabelFontSize}
              lineHeight={1 as any}
              px={8}
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
          // KENNY: check VO on these tips, esp for disabled
            aria-label={disabled ? '' : `Dismiss ${children} Tag`}
            onClick={onDismiss || undefined}
            tip="Remove"
            tipProps={{ placement: 'floating' }}
            icon={size === 'large' ? LargeMiniDeleteIcon : DefaultMiniDeleteIcon}
            width="100%"
            disabled={disabled}
            aria-disabled={disabled}
          // KENNY: include aria-disabled - this should remove
          />
        )}
      </FlexBox>
    </Outline>
  );
};
