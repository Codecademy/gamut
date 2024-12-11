import { FlexBox, Text } from '@codecademy/gamut';
import * as React from 'react';
import { ComponentHeaderProps } from './ComponentHeader';
import { ComponentSource } from '../Elements/ComponentSource';
import { SourceWrapper } from '../Elements/Wrappers';

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
      column
      mb={24}
      py={32}
      px={40}
    >
      <Text as="h1" variant="title-lg" mb={4} fontWeight={'bold'}>
        {title}
      </Text>
      <Text fontSize={16} mb={source ? 16 : 0}>
        {subtitle}
      </Text>
      {source && (
        <SourceWrapper>
          <ComponentSource {...source} />
        </SourceWrapper>
      )}
    </FlexBox>
  );
};
