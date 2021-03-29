import { Box, Card } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../Text';

export type HubCardProps = {
  eyebrowTitle: string;
  title: string;
  backgroundImage: string;
  backgroundPosition: 'left' | 'right';
};

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
      <Text as="p" fontSize={16}>
        {eyebrowTitle}
      </Text>
      <Text as="p" fontSize={22} fontWeight="title">
        {title}
      </Text>
    </Box>
  </StyledCard>
);
