import { Description } from '@storybook/addon-docs/blocks';
import React, { useMemo } from 'react';
import { getTitle, useKind, Kind } from './utils';
import { Box, Reset, SectionLink, SectionStatus } from './elements';

interface SubsectionLink {
  children: string;
  kind: string;
  story: string;
}

export const Section = ({ kind }: { kind: string }) => {
  const { title, subtitle, status, childrenKinds, components } = useKind(kind);
  const renderSubsection = () => {
    let links = [];

    if (childrenKinds.length > 0) {
      links = childrenKinds.map(({ kind }) => (
        <SectionLink key={`${kind}-story`} kind={kind}>
          {getTitle(kind)}
        </SectionLink>
      ));
    }

    if (links.length === 0) {
      links = components.map((component) => (
        <SectionLink
          key={`${kind}-story-${component}`}
          kind={kind}
          story={component}
        >
          {component}
        </SectionLink>
      ));
    }

    if (links.length > 0) {
      return (
        <>
          <Box
            width="100%"
            position="absolute"
            display="inline-block"
            boxShadow="rgba(0,0,0,.1) 0 -1px 0 0 inset"
            left="0"
            right="0"
            top="0"
            minHeight="1px"
          />
          <Box
            maxWidth="100%"
            columnGap="1rem"
            display="flex"
            maxHeight="1rem"
            fontWeight="bold"
            flexWrap="wrap"
            overflow="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {links}
          </Box>
        </>
      );
    }
  };

  const content = (
    <Box
      padding="1.5rem"
      paddingBottom=".5rem"
      rowGap="0.4rem"
      display="grid"
      gridTemplateRows="min-content 4.5rem 3rem"
      overflow="hidden"
      position="relative"
    >
      <Box
        fontSize="22px"
        lineHeight="1.1"
        fontWeight="bold"
        position="relative"
      >
        {title}
        {status && <SectionStatus status={status} />}
      </Box>
      <Box overflowY="hidden">
        <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
      </Box>
      <Box
        display="grid"
        alignItems="center"
        paddingX="1.5rem"
        paddingBottom=".25rem"
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        height="3rem"
      >
        {renderSubsection()}
      </Box>
    </Box>
  );

  return (
    <SectionLink box kind={kind}>
      {content}
    </SectionLink>
  );
};
