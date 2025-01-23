import * as React from 'react';

import { FlexBox } from '../Box';
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
  href = undefined,
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

  // KENNY: change outlines to inherit???
  return (
    <Outline disabled={disabled} readOnly={isReadOnly} flexDirection="row" {...rest} >
      <TagLabelWrapper
        readOnly={isReadOnly}
        variant={variant}
        overflow={isInteractive ? 'hidden' : 'visible'}
        selectionDisabled={isSelectionVariant && disabled}
        disabled={!isReadOnly && disabled}
      >
        {variant && isInteractive ?
          <TagAnchor
            size={size}
            interactiveType={variant}
            onClick={onClick}
            href={!disabled ? href : ''}
            disabled={disabled}
          >
            {content}
          </TagAnchor> :
          <TagText size={size}>
            {content}
          </TagText>
        }
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
