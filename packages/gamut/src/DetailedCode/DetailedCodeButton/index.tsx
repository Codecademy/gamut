import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { Rotation } from '../../Animation';
import { Box, FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { DetailedCodeButtonWrapper } from '../elements';
import { DetailedCodeButtonProps } from '../types';

export const DetailedCodeButton: React.FC<DetailedCodeButtonProps> = ({
  heading,
  isExpanded,
  language,
  setIsExpanded,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev: boolean) => !prev);
    }
  };

  return (
    <FlexBox>
      <DetailedCodeButtonWrapper
        aria-expanded={isExpanded}
        height="100%"
        px={16}
        py={12}
        variant="interface"
        width="100%"
        onClick={handleClick}
      >
        <FlexBox
          alignItems="center"
          columnGap={16}
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <FlexBox alignItems="center" columnGap={12}>
            {heading && (
              <Text
                as="h3"
                fontWeight="title"
                p={0}
                textAlign="start"
                variant="title-xs"
              >
                {heading}
              </Text>
            )}
            <Text
              color="text-secondary"
              fontFamily="monospace"
              variant="p-small"
            >
              {language}
            </Text>
          </FlexBox>

          <Box p={8}>
            <Rotation height={16} rotated={isExpanded} width={16}>
              <MiniChevronDownIcon aria-hidden size={16} />
            </Rotation>
          </Box>
        </FlexBox>
      </DetailedCodeButtonWrapper>
    </FlexBox>
  );
};
