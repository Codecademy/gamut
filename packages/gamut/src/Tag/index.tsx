import * as React from 'react';

import { appendIconToContent } from '../helpers';
import {
  DismissButton,
  Outline,
  StyledMiniDeleteIcon,
  TagAnchor,
  TagLabelWrapper,
  TagText,
} from './elements';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'readOnly',
  onDismiss,
  href = '',
  onClick,
  disabled=false,
  size,
  icon,
  ...rest
}) => {
  const isSelectionVariant = variant === 'selection';
  const isSuggestionVariant = variant === 'suggestion';
  const isNavigationVariant = variant === 'navigation';
  const isReadOnly = variant === 'readOnly'
  const isInteractive = isSuggestionVariant || isNavigationVariant;

  const DeleteIcon: React.FC = () => <StyledMiniDeleteIcon size={size} aria-hidden />;
  const content = appendIconToContent({
    children,
    icon,
    iconAndTextGap: 8,
    iconPosition: 'left',
    iconSize: 16,
  });

  const sharedInteractiveProps = {
    size,
    disabled,
  }

  const CorrectLabel = (
    () => {
      if(variant === 'readOnly' ) {
        // Q: is it possible to type this where onClck throws an error?
        return <TagText onClick={() => console.log('hi')} size={size}>{content}</TagText>;
      }
      if(isSelectionVariant) {
        return <TagText {...sharedInteractiveProps}>{content}</TagText>;
      }
      if (isSuggestionVariant){
        return <TagAnchor interactiveType='suggestion'
        onClick={onClick} {...sharedInteractiveProps}>{content}</TagAnchor>
      }
      if (isNavigationVariant){
        return <TagAnchor interactiveType='navigation' href={disabled ? '' : href} {...sharedInteractiveProps}>{content}</TagAnchor>
      }
    }
  )()

  return (
    <Outline disabled={disabled} readOnly={isReadOnly} flexDirection="row" {...rest} >
      <TagLabelWrapper
        readOnly={isReadOnly}
        variant={variant}
        overflow={isInteractive ? 'hidden' : 'visible'}
        selectionDisabled={isSelectionVariant && disabled}
        disabled={!isReadOnly && disabled}
      >
        { CorrectLabel }
      </TagLabelWrapper>
      {isSelectionVariant && (
        <DismissButton
        // KENNY: check VO on these tips, esp for disabled
          aria-label={disabled ? '' : `Dismiss ${children} Tag`}
          onClick={onDismiss || undefined}
          tip={disabled ? '' : "Remove"}
          tipProps={{ placement: disabled ? undefined : 'floating' }}
          icon={DeleteIcon}
          width="100%"
          disabled={disabled}
          aria-disabled={disabled}
        />
      )}
    </Outline>
  );
};
