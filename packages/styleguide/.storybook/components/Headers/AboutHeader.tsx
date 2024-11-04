import { FlexBox, Text } from '@codecademy/gamut';
import * as React from 'react';

export interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <FlexBox pt={24} pb={12} column>
      <Text as="h1" variant="title-xl" mb={4}>
        {title}
      </Text>
      <Text variant="title-xs">{subtitle}</Text>
    </FlexBox>
  );
};
