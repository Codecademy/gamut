import { Text } from '@codecademy/gamut';
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
    <>
      <Text as="h1" variant="title-md">
        {title}
      </Text>
      <Text fontWeight="bold" my={16}>
        {subtitle}
      </Text>
    </>
  );
};
