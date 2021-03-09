import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Card } from '../Card';
import { Text } from '../Text';

export type HubCardProps = {
  eyebrowTitle: string;
  title: string;
  backgroundImage: string;
  backgroundPosition: 'left' | 'right';
};

const StyledText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  &:before {
    background: inherit;
  }
`;

export const HubCard: React.FC<HubCardProps> = ({
  eyebrowTitle,
  title,
  backgroundPosition,
  backgroundImage,
}) => (
  <StyledCard
    shadowOffset={4}
    padding={0}
    display="flex"
    justifyContent="center"
    backgroundRepeat="no-repeat"
    backgroundPosition={backgroundPosition}
    backgroundImage={`url(${backgroundImage})`}
    alignItems="center"
    paddingX={24}
    height="11.25rem"
  >
    <Box padding={24} backgroundColor="white" width="100%" maxWidth="17.5rem">
      <StyledText as="div" fontSize={16}>
        {eyebrowTitle}
      </StyledText>
      <StyledText as="div" fontSize={22} fontWeight="title">
        {title}
      </StyledText>
    </Box>
  </StyledCard>
);
