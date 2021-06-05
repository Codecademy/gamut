import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { components as htmlComponents } from '@storybook/components';
import {
  DocsContext,
  SourceContainer,
  DocsContextProps,
  CodeOrSourceMdx,
  HeadersMdx,
} from '@storybook/addon-docs/blocks';
import { AssetProvider } from '@codecademy/gamut-styles/src/AssetProvider';
import {
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles/src';
import { NavigationProvider } from '../Navigation/NavigationProvider';
import React from 'react';
import { merge } from 'lodash';
import { Link } from '../Markdown/Elements';
import { coreTheme } from '@codecademy/gamut-styles/src/themes/core';

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: Link,
  ...HeadersMdx,
};

const pseudos = [':active', ':hover', ':focus', 'disabled', ':focus-visible'];
const pseudoTest = new RegExp(/:hover|:focus|:active|:focus-visible/g);

export const pseudoStates = (element: any) => {
  if (pseudoTest.test(element.value)) {
    const newProps = [] as any;
    element.props.forEach((prop: any) => {
      newProps.push(prop);
      pseudos.forEach((pseudo) => {
        if (prop.includes(pseudo)) {
          newProps.push(
            `${pseudo.replace(':', '.')} ${prop.replace(pseudo, '')}`
          );
        }
      });
    });

    element.props = newProps;
  }
  return undefined;
};

export const DocsContainer: React.FC<{ context: DocsContextProps }> = ({
  context,
  children,
}) => {
  const { parameters = {} } = context || {};
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

  return (
    <DocsContext.Provider value={context}>
      <GamutProvider
        cache={createEmotionCache({
          speedy: false,
          stylisPlugins: [pseudoStates],
        })}
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
