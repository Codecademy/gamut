import { Box, Card } from '@codecademy/gamut';
import React from 'react';

import { Text } from '../Text';

export type HubCardProps = {
  eyebrowTitle: string;
  title: string;
  backgroundImage: string;
  backgroundPosition: 'left' | 'right';
};

export const HubCard: React.FC<HubCardProps> = ({
  eyebrowTitle,
  title,
  backgroundPosition,
  backgroundImage,
}) => (
  <Card
    shadow="medium"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition={backgroundPosition}
    backgroundImage={`url(${backgroundImage})`}
    height="11.25rem"
  >
    <Box p={24} bg="white" width="100%" maxWidth="17.5rem">
      <Text as="div" fontSize={16}>
        {eyebrowTitle}
      </Text>
      <Text as="div" fontSize={22} fontWeight="title">
        {title}
      </Text>
    </Box>
  </Card>
);
