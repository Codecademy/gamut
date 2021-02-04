import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { useKind } from './utils';
import { Section } from './Section';
import { Box } from './elements';

export const TableOfContents = () => {
  const { kind } = useContext(DocsContext);
  const { siblingKinds } = useKind(kind);

  return (
    <Box
      paddingTop="1rem"
      display="grid"
      maxWidth="100%"
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      columnGap="2rem"
      rowGap="2rem"
    >
      {siblingKinds.map(({ kind }) => (
        <Section key={`${kind}-item`} kind={kind} />
      ))}
    </Box>
  );
};
