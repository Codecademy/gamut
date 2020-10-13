import React, { createContext, useState } from 'react';
import { Global, css } from '@emotion/core';
import { Helmet } from 'react-helmet';

import '@codecademy/gamut-styles/core/_fonts.scss';

import { ThemeProvider } from 'emotion-theming';
import { theme, DynamicTheme, Theme } from './theme';
import { Box } from './elements/Box';
import { graphql, useStaticQuery } from 'gatsby';

const HelmetWrapper = Helmet as any;

const globalStyles = ({ theme }: { theme: Theme }) => css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fontFamily.base};
  }

  * {
    box-sizing: border-box;
    &::-webkit-scrollbar {
      height: ${theme.space[8]}px;
      width: ${theme.space[8]}px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${theme.textColor.accent};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  ul,
  ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const dynamicThemes: Record<string, DynamicTheme> = {
  light: {
    textColor: {
      primary: theme.color.navy,
      secondary: theme.color.yellow,
      accent: theme.color.pink,
      contrast: theme.color.white,
    },
    backgroundColor: {
      primary: theme.color.white,
      secondary: theme.color.yellow,
      accent: theme.color.palePink,
      contrast: theme.color.navy,
    },
  },
  dark: {
    textColor: {
      primary: theme.color.white,
      secondary: theme.color.pink,
      accent: theme.color.yellow,
      contrast: theme.color.navy,
    },
    backgroundColor: {
      primary: theme.color.navy,
      secondary: theme.color.yellow,
      accent: theme.color.palePink,
      contrast: theme.color.white,
    },
  },
};

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export const MultiTheme = createContext<{
  toggleTheme?: (theme: string) => void;
  theme?: string;
}>({});

const ThemeSwitcher = ({ children }) => {
  const [themeKey, setTheme] = useState<keyof typeof dynamicThemes>('light');
  const toggleTheme = (currentTheme) =>
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  const dynamicTheme = dynamicThemes[themeKey];
  const activeTheme = { ...theme, ...dynamicTheme };
  return (
    <MultiTheme.Provider value={{ theme: themeKey, toggleTheme }}>
      <ThemeProvider theme={activeTheme}>
        <Global styles={globalStyles({ theme: activeTheme })} />
        <Box
          colorVariant="primary"
          borderVariant="bordered"
          position="fixed"
          right="2rem"
          top="1rem"
          padding={8}
          onClick={() => {
            toggleTheme(themeKey);
          }}
          as="button"
        >
          {themeKey}
        </Box>
        {children}
      </ThemeProvider>
    </MultiTheme.Provider>
  );
};

const Page = (props) => {
  const data = useStaticQuery(query);
  const { title, description } = data.site.siteMetadata;

  return (
    <>
      <HelmetWrapper>
        <title>{title}</title>
        <meta name="twitter:description" content={description} />
        <meta name="description" content={description} />
      </HelmetWrapper>
      {props.children}
    </>
  );
};

export const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>;
};

export const wrapRootElement = ({ element, props }) => {
  return <ThemeSwitcher>{element}</ThemeSwitcher>;
};
