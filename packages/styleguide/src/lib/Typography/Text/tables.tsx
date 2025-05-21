import { Column, LayoutGrid, Text } from '@codecademy/gamut';
// eslint-disable-next-line gamut/import-paths
import { typographyElementVariants } from '@codecademy/gamut/src/Typography/variants';
import { Fragment } from 'react';

export const Elements: React.FC = () => (
  <LayoutGrid gap={32} my={48}>
    {Object.keys(typographyElementVariants).map((tag) => (
      <Fragment key={tag}>
        <Column alignItems="center" size={1}>
          <Text as="code" fontSize={14}>
            {tag}
          </Text>
        </Column>
        <Column size={11}>
          <Text as={tag as any}>Lorem Ipsum Dolor</Text>
        </Column>
      </Fragment>
    ))}
  </LayoutGrid>
);
