import React, { Fragment, useContext, useMemo } from 'react';
import { Description, DocsContext } from '@storybook/addon-docs/blocks';
import { allProps } from '../styles';
import { styled, css } from '@storybook/theming';
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { Indicator } from '../Badge';
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

  const links = useMemo<
    | {
        type: 'examples' | 'components';
        items: SubsectionLink[];
      }
    | undefined
  >(() => {
    const subsections = Object.keys(storyStore['_kinds'])
      .filter(createAdjacentFolderMethod(indexKind, 0))
      .map<SubsectionLink>((kind) => ({
        children: kind
          .split('/')
          .filter((slug) => slug !== INDEX_KIND)
          .reverse()[0],
        kind,
        story: '',
      }));

    if (subsections.length) {
      return {
        type: 'examples',
        items: subsections,
      };
    } else if (typeof subcomponents !== 'object') {
      return;
    }

    console.log(subcomponents);
    const items = Object.keys(subcomponents).map<SubsectionLink>((key) => ({
      children: key,
      kind,
      story: key.toLowerCase(),
    }));

    if (component?.name) {
      items.unshift({
        children: component?.name,
        kind,
        story: component?.name.toLowerCase(),
      });
    }

    return { type: 'components', items };
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
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        overflowY="hidden"
      >
        <Container fontSize="22px" fontWeight="bold">
          {title}
        </Container>
        {showStatus && <Indicator status={status || 'stable'} />}
      </Container>
      <Container overflowY="hidden">
        {subtitle && <Description>{subtitle}</Description>}
      </Container>
      {links?.type && (
        <Container paddingTop="1rem" flexDirection="column" position="relative">
          <Container
            position="absolute"
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
            {links.items.map(({ kind, story = undefined, ...props }) => (
              <StyledLinkTo
                key={`${kind}-story${story && `-${story}`}`}
                kind={kind}
                {...props}
              />
            ))}
          </Container>
        </Container>
      )}
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
