import React, { useContext } from 'react';
import { DocsContext, Title } from '@storybook/addon-docs/blocks';
import { StoryStatus } from './StoryStatus';
import { styled } from '@storybook/theming';
import { theme } from '@codecademy/gamut-styles';
import { OpenIcon } from '@codecademy/gamut-icons';

const figma = styled.a`
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: 0.5rem;
  align-items: center;
  color: ${theme.colors.blue};
  font-weight: bold;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content max-content 1fr max-content;
  align-items: center;
  column-gap: 1rem;
`;

const HeaderCol = styled.div``;

const StoryTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

export const Page = (props) => {
  const {
    mdxComponentMeta: { title },
    parameters: { component, subcomponents, status, pageTitle, figma },
  } = useContext(DocsContext);

  const titleString = pageTitle || title.split('/').reverse()[0];
  const hasComponent = Boolean(component || subcomponents);
  const hasStatus = Boolean(status);
  const showStatus = hasStatus || hasComponent;

  return (
    <>
      <HeaderRow>
        <HeaderCol>{<StoryTitle>{titleString}</StoryTitle>}</HeaderCol>
        <HeaderCol>
          {showStatus && <StoryStatus status={status || 'stable'} />}
        </HeaderCol>
        <HeaderCol />
        <HeaderCol>
          {figma && (
            <figma target="_blank" href={figma}>
              Figma Designs <OpenIcon />
            </figma>
          )}
        </HeaderCol>
      </HeaderRow>
      {props.children}
    </>
  );
};
