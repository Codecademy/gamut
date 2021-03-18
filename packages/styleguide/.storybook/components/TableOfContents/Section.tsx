import { Description } from '@storybook/addon-docs/blocks';
import React from 'react';
import { getTitle, useKind } from './utils';
import { Box, Reset, SectionLink, SectionStatus } from './elements';

export const Section = ({ kind }: { kind: string }) => {
  const {
    title,
    subtitle,
    status,
    childrenKinds,
    components,
    indexStory,
  } = useKind(kind);
  const renderSubsection = () => {
    let links: JSX.Element[] = [];

    if (childrenKinds.length > 0) {
      links = childrenKinds.map(({ kind }) => (
        <SectionLink key={`${kind}-story`} kind={kind} story={indexStory}>
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
            boxShadow="rgba(0,0,0,.1) 0 -1px 0 0 inset"
            top="0"
            minHeight="1px"
          />
          <Box
            display="flex"
            columnGap="1rem"
            maxHeight="1rem"
            fontWeight="bold"
            flexWrap="wrap"
            overflow="hidden"
            fontSize="14px"
            onClick={(e) => e.stopPropagation()}
          >
            {links}
          </Box>
        </>
      );
    }
  };

  const subsection = renderSubsection();

  return (
    <Box
      padding="1.5rem"
      paddingBottom=".5rem"
      rowGap="0.4rem"
      display="grid"
      gridTemplateRows="min-content 4.5rem 3rem"
      position="relative"
    >
      <SectionLink box kind={kind} story={indexStory}>
        <Box
          fontSize="22px"
          lineHeight="1.1"
          fontWeight="bold"
          position="relative"
        >
          {title}
          {status && <SectionStatus status={status} />}
        </Box>
      </SectionLink>
      <Box overflowY="hidden">
        <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
      </Box>
      <Box
        display="grid"
        alignItems="center"
        paddingX="1.5rem"
        paddingBottom=".25rem"
        position="absolute"
        zIndex={subsection ? 1 : -1}
        bottom="0"
        height="3rem"
        width="100%"
      >
        {renderSubsection()}
      </Box>
    </Box>
  );
};
