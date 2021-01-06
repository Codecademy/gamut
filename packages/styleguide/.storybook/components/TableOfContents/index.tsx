import React, { Fragment, useContext, useMemo } from 'react';
import { Description, DocsContext } from '@storybook/addon-docs/blocks';
import { allProps } from '../styles';
import { styled, css } from '@storybook/theming';
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { Badge, Indicator } from '../Badge';
import { startCase } from 'lodash';

const INDEX_KIND = 'About';

const Container = styled.div(allProps);

const StyledLinkTo = styled(LinkTo)<{ kind?: string; box?: boolean }>`
  color: #484848;
  border-radius: 4px;
  font-size: 14px;

  p {
    margin: 0;
  }

  a {
    color: #1ea7fd;

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ kind, box }) => {
    return css`
      ${box && boxShadows[1]}

      &:hover {
        ${kind && box && boxShadows[2]}
        text-decoration: none;
      }
    `;
  }}
`;

const ItemStatus = styled(Badge)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(100% + 1rem);
  padding: 0;
  width: 1rem;
  border-radius: 0.25rem 0 0 0.25rem;
`;

const createAdjacentFolderMethod = (indexKind: string, offset = 1) => {
  const sectionHeirarchy = indexKind.split('/');
  const adjacentDepth = sectionHeirarchy.length - offset;

  if (adjacentDepth === 0) {
    return (kind: string) => kind.split('/')[1] === INDEX_KIND;
  }

  const adjacentPath = sectionHeirarchy.slice(0, adjacentDepth).join('/');

  return (kind: string) => {
    const depth = kind.replace(`/${INDEX_KIND}`, '').split('/').length - 1;
    return (
      kind.indexOf(adjacentPath) === 0 &&
      indexKind !== kind &&
      depth === adjacentDepth
    );
  };
};

type SubsectionLink = {
  children: string;
  kind: string;
  story: string;
};

export const ContentItem = ({ kind }) => {
  const { storyStore } = useContext(DocsContext);
  const { [kind]: kindMeta = {} } = storyStore['_kinds'];
  const {
    parameters: { status, component, subcomponents, subtitle },
  } = kindMeta;

  const path = kind.split('/');
  const indexKind = path.filter((slug) => slug !== INDEX_KIND).join('/');

  const links = useMemo<SubsectionLink[]>(() => {
    const components = Object.keys(subcomponents ?? {});
    const sections = Object.keys(storyStore['_kinds']).filter(
      createAdjacentFolderMethod(indexKind, 0)
    );

    if (sections.length) {
      return sections.map<SubsectionLink>((kind) => ({
        children: kind
          .split('/')
          .filter((slug) => slug !== INDEX_KIND)
          .reverse()[0],
        kind,
        story: '',
      }));
    } else if (components.length) {
      return [component?.name, ...components]
        .filter((x) => x)
        .map<SubsectionLink>((key) => ({
          children: key,
          kind,
          story: key.toLowerCase(),
        }));
    }

    return [] as SubsectionLink[];
  }, [indexKind, storyStore, kind]);

  if (!kindMeta) return null;

  const title = kind.replace('/About', '').split('/').reverse()[0];
  const showStatus = Boolean(status || component || subcomponents);
  const content = (
    <Container
      padding="1.5rem"
      rowGap="0.5rem"
      display="grid"
      gridTemplateRows="min-content 5rem 1.5rem"
      overflow="hidden"
    >
      <Container fontSize="22px" fontWeight="bold" position="relative">
        {title} {showStatus && <ItemStatus status={status || 'stable'} />}
      </Container>
      <Container overflowY="hidden">
        {subtitle && <Description>{subtitle}</Description>}
      </Container>
      <Container paddingTop="1rem" flexDirection="column" position="relative">
        {links.length > 0 && (
          <>
            <Container
              position="absolute"
              display="inline-block"
              boxShadow="rgba(0,0,0,.1) 0 -1px 0 0 inset"
              left="-1.5rem"
              right="-1.5rem"
              top="0"
              minHeight="1px"
            />
            <Container
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
                <StyledLinkTo
                  key={`${kind}-story${story && `-${story}`}`}
                  kind={kind}
                  {...props}
                />
              ))}
            </Container>
          </>
        )}
      </Container>
    </Container>
  );

  return (
    <StyledLinkTo box kind={kind}>
      {content}
    </StyledLinkTo>
  );
};

export const TableOfContents = () => {
  const { kind, storyStore } = useContext(DocsContext);
  const allKinds = storyStore['_kinds'];

  const filterMethod = useMemo(() => {
    return createAdjacentFolderMethod(kind);
  }, [kind]);

  const kinds = useMemo(() => {
    return Object.entries(allKinds)
      .reduce<Record<string, any>[]>(
        (carry, [path, meta]: [string, Record<string, any>]) => {
          if (filterMethod(path)) {
            return [...carry, { kind: path, ...meta }];
          }
          return carry;
        },
        []
      )
      .sort((a, b) => {
        const weights = ['stable', 'volatile', 'deprecated'];
        return (
          weights.indexOf(a?.parameters?.status) -
          weights.indexOf(b?.parameters?.status)
        );
      });
  }, [allKinds, filterMethod]);

  return (
    <Container
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
          <ContentItem
            key={`${adjacentKind.kind}-item`}
            kind={adjacentKind.kind}
          />
        );
      })}
    </Container>
  );
};
