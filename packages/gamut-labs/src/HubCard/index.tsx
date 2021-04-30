import { Box, Card, Text } from '@codecademy/gamut';
import React from 'react';

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
    <Box padding={24} backgroundColor="white" width="100%" maxWidth="17.5rem">
      <Text as="p" fontSize={16}>
        {eyebrowTitle}
      </Text>
      <Text as="p" variant="title-sm">
        {title}
      </Text>
    </Box>
  </Card>
);
