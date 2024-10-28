import { Text } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
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
    <Background
      bg="navy-900"
      borderWidth="10px"
      borderColor="white-200"
      borderStyle="solid"
      borderRadius="md"
      p={24}
      display="flex"
      flexDirection="column"
    >
      <Text variant="title-xl" mb={8} smooth>
        {title}
      </Text>
      <Text as="code">{subtitle}</Text>
    </Background>
  );
};
