import { FlexBox, Text } from '@codecademy/gamut';
import * as React from 'react';
import { ComponentHeaderProps } from './ComponentHeader';
import { ComponentSource } from '../Elements/ComponentSource';

export type AboutHeaderProps = {
  title: string;
  subtitle: string;
} & Pick<ComponentHeaderProps, 'source'>;

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  title,
  subtitle,
  source,
}) => {
  return (
    <FlexBox
      bg="navy-100"
      border={1}
      borderColor="navy-300"
      borderRadius="md"
      fontWeight={'bold'}
      pt={24}
      px={24}
      mb={24}
      pb={12}
      column
    >
      <Text as="h1" variant="title-xl" mb={4}>
        {title}
      </Text>
      <Text variant="title-xs" mb={8}>
        {subtitle}
      </Text>
      {source && <ComponentSource {...source} />}
    </FlexBox>
  );
};
