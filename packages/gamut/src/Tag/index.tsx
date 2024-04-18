import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { useCurrentMode } from '@codecademy/gamut-styles';
import * as React from 'react';

import { Text } from '../Typography';
import { DismissButton, Outline, TagWrapper } from './elements';
import { tagBg, tagLabelFontSize, tagLabelPadding } from './styles';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  const mode = useCurrentMode();
  const trueVariant = !variant ? 'default' : variant;
  return (
    <Outline {...rest}>
      <TagWrapper bg={tagBg[mode][trueVariant]} variant={trueVariant}>
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
        {!readonly && (
          <DismissButton
            aria-label={`Dismiss ${children} Tag`}
            onClick={onDismiss || undefined}
          >
            <MiniDeleteIcon size={12} color="inherit" />
          </DismissButton>
        )}
      </TagWrapper>
    </Outline>
  );
};
