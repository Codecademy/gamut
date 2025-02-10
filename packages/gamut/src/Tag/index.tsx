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
  disabled = false,
  href = '',
  icon,
  onClick,
  onDismiss,
  size,
  variant = 'readOnly',
  ...rest
}) => {
  const isReadOnly = variant === 'readOnly';
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
    disabled,
    size,
  };

  const CorrectLabel = (() => {
    switch (variant) {
      case 'readOnly':
        return <TagText size={size}>{content}</TagText>;
      case 'selection':
        return <TagText {...sharedInteractiveProps}>{content}</TagText>;
      case 'navigation':
        return (
          <TagAnchor
            interactiveType="navigation"
            href={disabled ? '' : href}
            onClick={onClick}
            {...sharedInteractiveProps}
          >
            {content}
          </TagAnchor>
        );
      case 'suggestion':
        return (
          <TagAnchor
            interactiveType="suggestion"
            onClick={onClick}
            {...sharedInteractiveProps}
          >
            {content}
          </TagAnchor>
        );
      default:
        return null;
    }
  })();

  return (
    <Outline disabled={disabled} readOnly={isReadOnly} {...rest}>
      <TagLabelWrapper
        disabled={!isReadOnly && disabled}
        overflow={isInteractive ? 'hidden' : 'visible'}
        readOnly={isReadOnly}
        selectionDisabled={isSelection && disabled}
        variant={variant}
      >
        {CorrectLabel}
      </TagLabelWrapper>
      {isSelection && (
        <DismissButton
          aria-disabled={disabled}
          aria-label={disabled ? '' : `Dismiss ${children} Tag`}
          disabled={disabled}
          icon={isLarge ? LargeMiniDeleteIcon : DefaultMiniDeleteIcon}
          isLarge={isLarge}
          onClick={onDismiss || undefined}
          tip={disabled ? '' : 'Remove'}
          tipProps={{ placement: disabled ? undefined : 'floating' }}
        />
      )}
    </Outline>
  );
};
