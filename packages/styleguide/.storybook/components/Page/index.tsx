import React, { useContext } from 'react';
import { Description, DocsContext, Title } from '@storybook/addon-docs/blocks';
import { Badge } from '../Badge';
import { spacing } from '../styles';
import { styled } from '@storybook/theming';
import { theme } from '@codecademy/gamut-styles';
import { OpenIcon } from '@codecademy/gamut-icons';
import { tail } from 'lodash';

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

export interface Parameters {
  component?: React.Component | string;
  subcomponents?: Record<string, React.Component>;
  subtitle?: string;
  status?: 'stable' | 'volatile' | 'deprecated';
  figmaId?: string;
  source?: string;
}

export const Page: React.FC = ({ children }) => {
  const { kind, parameters } = useContext(DocsContext);
  const {
    component,
    subcomponents,
    status,
    subtitle,
    figmaId,
    source,
  }: Parameters = parameters;

  const showStatus = Boolean(status || component || subcomponents);

  const npmLink = `https://www.npmjs.com/package/@codecademy/${source}`;
  const figmaLink = `https://www.figma.com/file/${figmaId}`;
  const title = kind.replace('/About', '').split('/').reverse()[0];

  return (
    <>
      <Header marginBottom="1rem">
        <HeaderRow>
          <HeaderCol>
            <Title>{title}</Title>
          </HeaderCol>
        </HeaderRow>
        <HeaderRow>
          {showStatus && (
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
