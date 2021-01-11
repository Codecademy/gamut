import React, { useContext } from 'react';
import { Description, DocsContext, Title } from '@storybook/addon-docs/blocks';
import { Badge } from '../Badge';
import { spacing } from '../styles';
import { styled } from '@storybook/theming';
import { theme } from '@codecademy/gamut-styles';
import { OpenIcon } from '@codecademy/gamut-icons';
import { Parameters } from '@storybook/addons';
import { useKind } from '../TableOfContents/utils';
import { Box, SectionLink } from '../TableOfContents/elements';

const Link = styled.a`
  display: inline-flex;
  line-height: 1;
  column-gap: 0.5rem;
  align-items: flex-start;
  color: ${theme.colors.blue};
  border-bottom: 2px solid transparent;

  &:hover {
    text-decoration: none;
    border-bottom-color: ${theme.colors.blue};
  }
`;

const Header = styled.div`
  ${spacing}
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.5rem;
  ${spacing}
`;

const HeaderCol = styled.div``;

export interface GamutParameters extends Parameters {
  subtitle?: string;
  status?: 'stable' | 'volatile' | 'deprecated';
  figmaId?: string;
  source?: string;
}

const BreadCrumbs: React.FC<{ path: string[] }> = ({ path }) => {
  const { storyStore } = useContext(DocsContext);
  if (path[0] === 'Gamut') return null;

  const links = [{ text: 'Gamut', kind: 'Gamut' }];

  path.forEach((kind, i) => {
    const prevKind = i ? `${links[i - 1].kind}/` : '';

    const nextLink = {
      text: kind,
      kind: `${prevKind}${kind}`,
    };

    links.push(nextLink);
  });

  return (
    <Box
      display="flex"
      columnGap="0.5rem"
      marginBottom="0.5rem"
      fontWeight="bold"
      fontSize="16px"
    >
      {links.map(({ text, kind }, i) => {
        const key = `breadcrumb-${text}`;
        if (i + 1 < links.length) {
          const kindIndex = storyStore._kinds?.[kind] ? kind : `${kind}/About`;

          return (
            <React.Fragment key={key}>
              <SectionLink key={kind} kind={kindIndex}>
                {text}
              </SectionLink>
              <span>&gt;</span>
            </React.Fragment>
          );
        }
        return <span key={key}>{text}</span>;
      })}
    </Box>
  );
};

export const Page: React.FC = ({ children }) => {
  const { kind } = useContext(DocsContext);
  const {
    path,
    status,
    title,
    subtitle,
    parameters: { figmaId, source },
  } = useKind(kind);

  const npmLink = `https://www.npmjs.com/package/@codecademy/${source}`;
  const figmaLink = `https://www.figma.com/file/${figmaId}`;

  return (
    <>
      <Header marginBottom="1rem">
        <div>
          <BreadCrumbs path={path} />
        </div>
        <HeaderRow>
          <HeaderCol>
            <Title>{title}</Title>
          </HeaderCol>
        </HeaderRow>
        <HeaderRow>
          {status && (
            <>
              <HeaderCol>
                <strong>Status:</strong>
              </HeaderCol>
              <HeaderCol>
                <Badge status={status || 'stable'}>{status || 'stable'}</Badge>
              </HeaderCol>
            </>
          )}
          {source && (
            <>
              <HeaderCol>
                <strong>Source:</strong>
              </HeaderCol>
              <HeaderCol>
                <Link target="_blank" href={npmLink}>
                  @codecademy/{source} <OpenIcon size={14} />
                </Link>
              </HeaderCol>
            </>
          )}
          {figmaId && (
            <>
              <HeaderCol>
                <strong>Design:</strong>
              </HeaderCol>
              <HeaderCol>
                <Link target="_blank" href={figmaLink}>
                  Figma <OpenIcon size={14} />
                </Link>
              </HeaderCol>
            </>
          )}
        </HeaderRow>
      </Header>
      <Description>{subtitle}</Description>
      {children}
    </>
  );
};
