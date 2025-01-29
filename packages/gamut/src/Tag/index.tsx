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
  const isReadOnly = variant === 'readOnly'
  const isSelection = variant === 'selection';
  const isNavigation = variant === 'navigation';
  const isSuggestion = variant === 'suggestion';
  const isInteractive = isNavigation || isSuggestion;

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
        // Q: is it possible to type this where onClick throws an error?
        return <TagText size={size}>{content}</TagText>;
      }
      if(isSelection) {
        return <TagText {...sharedInteractiveProps}>{content}</TagText>;
      }
      if (isSuggestion){
        return <TagAnchor interactiveType='suggestion'
        onClick={onClick} {...sharedInteractiveProps}>{content}</TagAnchor>
      }
      if (isNavigation){
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
        selectionDisabled={isSelection && disabled}
        disabled={!isReadOnly && disabled}
      >
        { CorrectLabel }
      </TagLabelWrapper>
      {isSelection && (
        <DismissButton
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
