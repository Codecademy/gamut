import { FlexBox, Text } from '@codecademy/gamut';
import { Avatar } from '@codecademy/gamut-labs';
import * as React from 'react';

type ExampleCardProps = {
  src: string;
  quote: string;
  speaker: string;
};

export const ExampleCard: React.FC<ExampleCardProps> = ({
  src,
  speaker,
  quote,
}) => (
  <FlexBox alignItems="center" mt={16}>
    <Avatar src={src} alt={speaker} disableDropshadow />
    <FlexBox flexDirection="column" ml={8}>
      <Text>{`"${quote}"`}</Text>
      <Text>{`- ${speaker}`}</Text>
    </FlexBox>
  </FlexBox>
);
