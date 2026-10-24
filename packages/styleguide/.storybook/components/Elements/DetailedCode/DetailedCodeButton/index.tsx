import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import * as React from 'react';
import { Anchor, Rotation, FlexBox, Text } from '@codecademy/gamut';

import { DetailedCodeButtonProps } from '../types';

export const DetailedCodeButton: React.FC<DetailedCodeButtonProps> = ({
  isExpanded,
  onToggle,
  language,
}) => {
  return (
    <Anchor
      aria-expanded={isExpanded}
      px={16}
      py={12}
      variant="interface"
      width="100%"
      onClick={onToggle}
    >
      <FlexBox columnGap={16} justifyContent="space-between">
        <Text>{language}</Text>
        <FlexBox columnGap={8} alignItems="center">
          <Text>{isExpanded ? 'Show Less Code' : 'Show More Code'}</Text>
          <Rotation rotated={isExpanded}>
            <MiniChevronDownIcon aria-hidden size={16} />
          </Rotation>
        </FlexBox>
      </FlexBox>
    </Anchor>
  );
};
