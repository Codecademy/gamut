import React, { useContext, useMemo } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { allProps } from '../styles';
import { styled } from '@storybook/theming';
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { Indicator } from '../Badge';

const INDEX_KIND = 'About';

const Container = styled.div(allProps);

const StyledLinkTo = styled(LinkTo)`
  color: #484848;
  border-radius: 4px;
  font-size: 14px;
  ${boxShadows[1]}

  &:hover {
    ${boxShadows[2]}
    text-decoration: none;
  }
`;

const createAdjacentFolderMethod = (indexKind: string) => {
  const sectionHeirarchy = indexKind.split('/');
  const adjacentDepth = sectionHeirarchy.length - 1;

  if (adjacentDepth === 0) {
    return (kind: string) => kind.split('/')[1] === INDEX_KIND;
  }

  const adjacentPath = sectionHeirarchy.slice(0, adjacentDepth).join('/');

  return (kind: string) => {
    const depth = kind.split('/').length - 1;
    return (
      kind.indexOf(adjacentPath) === 0 &&
      indexKind !== kind &&
      depth === adjacentDepth
    );
  };
};

export const ContentItem = ({ kind }) => {
  const { storyStore } = useContext(DocsContext);
  const kindMeta = storyStore['_kinds']?.[kind];

  if (!kindMeta) return null;
  const path = kind.split('/');
  const {
    parameters: {
      pageTitle,
      description,
      status,
      component,
      subcomponents,
      figmaId,
    },
  } = kindMeta;

  const title = pageTitle || path[path.length - 1];
  const showStatus = Boolean(status || component || subcomponents);

  return (
    <StyledLinkTo kind={kind}>
      <Container padding="1.5rem" paddingY="1rem">
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Container fontSize="22px" fontWeight="bold">
            {title}
          </Container>
          {showStatus && <Indicator status={status || 'stable'} />}
        </Container>

        {description && <p>{description}</p>}
      </Container>
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
    return Object.entries(allKinds).reduce<Record<string, any>[]>(
      (carry, [path, meta]: [string, Record<string, any>]) => {
        if (filterMethod(path)) {
          return [...carry, { kind: path, ...meta }];
        }
        return carry;
      },
      []
    );
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
        return <ContentItem kind={adjacentKind.kind} />;
      })}
    </Container>
  );
};
