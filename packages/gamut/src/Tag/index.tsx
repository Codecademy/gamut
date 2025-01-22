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
  onDismiss,
  href = undefined,
  onClick,
  disabled=false,
  size,
  // isLarge = false,
  ...rest
}) => {
  const isSelectionVariant = variant === 'selection';
  const isSuggestionVariant = variant === 'suggestion';
  const isNavigationVariant = variant === 'navigation';
  const isReadOnly = variant === 'readOnly'
  const isInteractive = isSuggestionVariant || isNavigationVariant;

// KENNY: change outlines to inherit???
  return (
    <Outline disabled={disabled} readOnly={isReadOnly} {...rest} >
      <FlexBox
        flexDirection="row"
        {...rest}
        // KENNY: this needs some guidance, what should the width be for truncation or overflow?
        width={isSelectionVariant ? 'calc(100% - 24px)' : 'fit-content' }
        height='100%'
      >
        <TagLabelWrapper readOnly={variant === 'readOnly'} variant={variant} size={size} overflow={isInteractive ? 'hidden' : 'visible'} selectionDisabled={isSelectionVariant && disabled} disabled={!isReadOnly && disabled}>
          {/* KENNY: would need to add some icon logic here (and props as well)  */}
          {/* probs need to add Text as its own element and add it to the appendIcon function call, maybe add a Text variant with css props?  */}
          {variant && (variant === 'navigation' || variant === 'suggestion') ?
            <TagAnchor interactiveType={variant} onClick={onClick} href={!disabled ? href : ''} disabled={disabled}>
              {children}
            </TagAnchor> :
            <Text
              fontSize={tagLabelFontSize}
              lineHeight={1.5 as any}
              px={8}
              py={}
              // Would this be some state now?
              // maybe Text will have to be a separate element as well that
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
            tip={disabled ? '' : "Remove"}
            tipProps={{ placement: disabled ? undefined : 'floating' }}
            icon={size === 'large' ? LargeMiniDeleteIcon : DefaultMiniDeleteIcon}
            width="100%"
            disabled={disabled}
            aria-disabled={disabled}
          />
        )}
      </FlexBox>
    </Outline>
  );
};
