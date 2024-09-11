import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { components as htmlComponents } from '@storybook/components';
import Helmet from 'react-helmet';
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
import { useEffect } from 'react';
import * as React from 'react';
import merge from 'lodash/merge';
import { Link } from '../Markdown/Elements';
import { enterpriseTheme } from '@codecademy/gamut-styles/src/themes';

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: Link,
  ...HeadersMdx,
};

/**
 * This is not importable from SB but is ported here
 * https://github.com/storybookjs/storybook/blob/a2752c20b83025da7b57ecb691ebeea11ab2d247/addons/docs/src/blocks/utils.ts#L41
 */
export function scrollToElement(
  element: Element,
  block: ScrollLogicalPosition = 'start'
) {
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

  /**
   * Since we replace the default version of this component we need to reimplmenet the scrolling behavior
   *
   * This is copied from the SB source with some slight adjustments
   * https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/DocsContainer.tsx#L48
   */
  useEffect(() => {
    let url: URL;
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
        theme={enterpriseTheme as any}
      >
        <Helmet>
          <AssetProvider />
        </Helmet>
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
