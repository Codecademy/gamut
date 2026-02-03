import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { Anchor } from '../../Anchor';
import { Rotation } from '../../Animation';
import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { DetailedCodeButtonProps } from '../types';

export const DetailedCodeButton: React.FC<DetailedCodeButtonProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev: boolean) => !prev);
    }
  };

  return (
    <Anchor
      aria-expanded={isExpanded}
      height="100%"
      px={16}
      py={12}
      variant="interface"
      width="100%"
      onClick={handleClick}
    >
      <FlexBox
        columnGap={16}
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Text>{isExpanded ? 'Show Less Code' : 'Show More Code'}</Text>
        <Rotation height={16} rotated={isExpanded} width={16}>
          <MiniChevronDownIcon aria-hidden size={16} />
        </Rotation>
      </FlexBox>
    </Anchor>
  );
};
