import { Description, DocsContext } from '@storybook/addon-docs/blocks';
import React, { useContext, useMemo } from 'react';
import { getAdjacentKinds, getTitle, parsePath } from './utils';
import { Box, SectionLink, SectionStatus } from './elements';
import { uniq } from 'lodash';

interface SubsectionLink {
  children: string;
  kind: string;
  story: string;
}

function useSectionLinks(kind: string) {
  const { storyStore } = useContext(DocsContext);
  const parameters = storyStore?.['_kinds']?.[kind]?.parameters;
  const { component, subcomponents } = parameters;
  const kinds = Object.keys(storyStore['_kinds']);

  const links = useMemo(() => {
    const indexKind = parsePath(kind).join('/');
    const links: SubsectionLink[] = [];
    const sections = kinds.filter(getAdjacentKinds(indexKind, 0));

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
  }, [component, subcomponents, kind, kinds]);

  return links;
}

export const Section = ({ kind }) => {
  const { storyStore } = useContext(DocsContext);
  const links = useSectionLinks(kind);
  const kindMeta = storyStore?.['_kinds']?.[kind];
  const { status, component, subcomponents, subtitle } = kindMeta?.parameters;
  const showStatus = Boolean(status || component || subcomponents);

  if (!kindMeta) return null;

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
              fontWeight="bold"
              overflowX="auto"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((props) => {
                const key = [props.kind, 'story', props.story].join('-');
                return <SectionLink key={key} {...props} />;
              })}
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
