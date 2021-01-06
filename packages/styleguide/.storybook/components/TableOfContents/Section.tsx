import { Description, DocsContext } from '@storybook/addon-docs/blocks';
import React, { useContext, useMemo } from 'react';
import { getAdjacentKinds, getTitle, parsePath } from './getAdjacentKinds';
import { Box, SectionLink, SectionStatus } from './elements';
import { uniq } from 'lodash';

type SubsectionLink = {
  children: string;
  kind: string;
  story: string;
};

export const Section = ({ kind }) => {
  const { storyStore } = useContext(DocsContext);
  const { [kind]: kindMeta = {} } = storyStore['_kinds'];
  const {
    parameters: { status, component, subcomponents, subtitle },
  } = kindMeta;

  const indexKind = parsePath(kind).join('/');

  const links = useMemo(() => {
    const links: SubsectionLink[] = [];

    const sections = Object.keys(storyStore['_kinds']).filter(
      getAdjacentKinds(indexKind, 0)
    );

    if (sections.length) {
      sections.forEach((kind) =>
        links.push({
          children: parsePath(kind).reverse()[0],
          kind,
          story: '',
        })
      );
      return links;
    }

    const components = Object.keys(subcomponents ?? {});

    if (components.length) {
      uniq([component?.name, ...components])
        .filter(Boolean)
        .forEach((key) =>
          links.push({
            children: key,
            kind,
            story: key.toLowerCase(),
          })
        );

      return links;
    }

    return links;
  }, [indexKind, storyStore, kind]);

  if (!kindMeta) return null;

  const showStatus = Boolean(status || component || subcomponents);

  const content = (
    <Box
      padding="1.5rem"
      rowGap="0.5rem"
      display="grid"
      gridTemplateRows="min-content 5rem 1.5rem"
      overflow="hidden"
    >
      <Box fontSize="22px" fontWeight="bold" position="relative">
        {getTitle(kind)}
        {showStatus && <SectionStatus status={status || 'stable'} />}
      </Box>
      <Box overflowY="hidden">
        {subtitle && <Description>{subtitle}</Description>}
      </Box>
      <Box paddingTop="1rem" flexDirection="column" position="relative">
        {links.length > 0 && (
          <>
            <Box
              position="absolute"
              display="inline-block"
              boxShadow="rgba(0,0,0,.1) 0 -1px 0 0 inset"
              left="-1.5rem"
              right="-1.5rem"
              top="0"
              minHeight="1px"
            />
            <Box
              columnGap="1rem"
              display="flex"
              flexWrap="wrap"
              maxHeight="1rem"
              lineHeight="1rem"
              fontWeight="bold"
              overflowX="auto"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map(({ kind, story = undefined, ...props }) => (
                <SectionLink
                  key={`${kind}-story${story && `-${story}`}`}
                  kind={kind}
                  {...props}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <SectionLink box kind={kind}>
      {content}
    </SectionLink>
  );
};
