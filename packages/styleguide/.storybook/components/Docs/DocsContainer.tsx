import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { components as htmlComponents } from '@storybook/components';
import {
  DocsContext,
  SourceContainer,
  DocsContextProps,
  CodeOrSourceMdx,
  HeadersMdx,
  storyBlockIdFromId,
  anchorBlockIdFromId,
} from '@storybook/addon-docs/blocks';
import { AssetProvider } from '@codecademy/gamut-styles/src/AssetProvider';
import {
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles/src';
import { NavigationProvider } from '../Navigation/NavigationProvider';
import React, { useEffect } from 'react';
import { merge } from 'lodash';
import { Link } from '../Markdown/Elements';
import { coreTheme } from '@codecademy/gamut-styles/src/themes/core';

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: Link,
  ...HeadersMdx,
};

export function scrollToElement(element: any, block = 'start') {
  element.scrollIntoView({
    behavior: 'smooth',
    block,
    inline: 'nearest',
  });
}

export const DocsContainer: React.FC<{ context: DocsContextProps }> = ({
  context,
  children,
}) => {
  const { id: storyId, parameters = {} } = context || {};
  const { docs = {} } = parameters;

  const overrides = merge({}, ensureTheme(docs.theme), {
    appBorderRadius: 2,
    typography: {
      size: {
        s2: 16,
      },
    },
  });
  const allComponents = { ...defaultComponents, ...docs.components };

  useEffect(() => {
    let url;
    try {
      url = new URL(window.parent.location.href);
    } catch (err) {
      return;
    }
    if (url.hash) {
      const element = document.getElementById(url.hash.substring(1));
      if (element) {
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(() => {
          scrollToElement(element);
        }, 200);
      }
    } else {
      const element =
        document.getElementById(anchorBlockIdFromId(storyId!)) ||
        document.getElementById(storyBlockIdFromId(storyId!));
      if (element) {
        const allStories = element?.parentElement?.querySelectorAll(
          '[id|="anchor-"]'
        );
        let scrollTarget = element;
        if (allStories && allStories[0] === element) {
          // Include content above first story
          scrollTarget = document.getElementById('docs-root')!;
        }
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(() => {
          scrollToElement(scrollTarget, 'start');
        }, 200);
      }
    }
  }, [storyId]);

  return (
    <DocsContext.Provider value={context}>
      <GamutProvider
        cache={createEmotionCache({ speedy: false })}
        theme={coreTheme}
      >
        <AssetProvider />
        <NavigationProvider>
          <SourceContainer>
            <ThemeProvider theme={overrides}>
              <MDXProvider components={allComponents}>{children}</MDXProvider>
            </ThemeProvider>
          </SourceContainer>
        </NavigationProvider>
      </GamutProvider>
    </DocsContext.Provider>
  );
};
