import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { useCurrentMode } from '@codecademy/gamut-styles';
import React from 'react';

import { Text } from '../Typography';
import { DeleteButton, Outline, TagWrapper } from './elements';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  const mode = useCurrentMode();

  return (
    <Outline {...rest}>
      <TagWrapper
        bg={
          variant === 'grey'
            ? 'navy-500'
            : mode === 'light'
            ? 'navy-900'
            : 'white'
        }
      >
        <Text
          as="span"
          fontSize={14}
          lineHeight={1 as any}
          px={8}
          truncate="ellipsis"
          truncateLines={1}
        >
          {children}
        </Text>
        {!readonly && (
          <DeleteButton
            aria-label={`Delete ${children} Tag`}
            onClick={onDismiss || undefined}
          >
            <MiniDeleteIcon size={12} />
          </DeleteButton>
        )}
      </TagWrapper>
    </Outline>
  );
};
