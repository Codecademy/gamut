import React, { useContext, useMemo } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { getAdjacentKinds, sortByStatus } from './utils';
import { Section } from './Section';
import { Box } from './elements';

export const TableOfContents = () => {
  const { kind, storyStore } = useContext(DocsContext);
  const allKinds = storyStore['_kinds'];

  const kinds = useMemo(() => {
    return Object.keys(allKinds)
      .filter(getAdjacentKinds(kind))
      .map((kind) => ({ ...allKinds?.[kind], kind }))
      .sort(sortByStatus);
  }, [allKinds, kind]);

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
      {kinds.map((adjacentKind) => {
        return (
          <Section key={`${adjacentKind.kind}-item`} kind={adjacentKind.kind} />
        );
      })}
    </Box>
  );
};
