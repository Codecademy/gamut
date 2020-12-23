import React, { useContext } from 'react';
import { DocsContext, Title } from '@storybook/addon-docs/blocks';
import { StoryStatus } from './StoryStatus';

export const Page = (props) => {
  const {
    mdxComponentMeta: { title },
    parameters: { component, subcomponents, status, pageTitle },
  } = useContext(DocsContext);

  const titleString = pageTitle || title.split('/').reverse()[0];
  const hasComponent = Boolean(component || subcomponents);
  const hasStatus = Boolean(status);
  const showStatus = hasStatus || hasComponent;

  return (
    <>
      {<Title>{titleString}</Title>}
      {showStatus && <StoryStatus status={status || 'stable'} />}
      {props.children}
    </>
  );
};
