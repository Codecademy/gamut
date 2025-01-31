import * as React from 'react';

import { appendIconToContent } from '../helpers';
import {
  DefaultMiniDeleteIcon,
  DismissButton,
  LargeMiniDeleteIcon,
  Outline,
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
  disabled = false,
  size,
  icon,
  ...rest
}) => {
  const isReadOnly = variant === 'readOnly'
  const isSelection = variant === 'selection';
  const isNavigation = variant === 'navigation';
  const isSuggestion = variant === 'suggestion';
  const isInteractive = isNavigation || isSuggestion;
  const isLarge = size === 'large';


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
      if(isReadOnly) {
        return <TagText size={size}>{content}</TagText>;
      }
      if(isSelection) {
        return <TagText {...sharedInteractiveProps}>{content}</TagText>;
      }
      if(isSuggestion){
        return <TagAnchor interactiveType='suggestion'
        onClick={onClick} {...sharedInteractiveProps}>{content}</TagAnchor>
      }
      if(isNavigation){
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
          icon={isLarge ? LargeMiniDeleteIcon : DefaultMiniDeleteIcon}
          disabled={disabled}
          aria-disabled={disabled}
          isLarge={isLarge}
        />
      )}
    </Outline>
  );
};
