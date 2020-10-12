import React, { createContext, useState } from 'react';
import { Global, css } from '@emotion/core';

import '@codecademy/gamut-styles/core/_fonts.scss';

import { ThemeProvider } from 'emotion-theming';
import { theme, DynamicTheme } from '../theme';

import { Layout } from './layout';

const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fontFamily.base};
  }

  * {
    box-sizing: border-box;
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

export const MultiTheme = createContext<{
  toggleTheme?: (theme: string) => void;
  theme?: string;
}>({});

const ThemeSwitcher = ({ children }) => {
  const [themeKey, setTheme] = useState<keyof typeof dynamicThemes>('light');
  const toggleTheme = (currentTheme) =>
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  const activeTheme = dynamicThemes[themeKey];

  return (
    <MultiTheme.Provider value={{ theme: themeKey, toggleTheme }}>
      <ThemeProvider theme={{ ...theme, ...activeTheme }}>
        {children}
      </ThemeProvider>
    </MultiTheme.Provider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <ThemeSwitcher>
        <Layout {...props}>{element}</Layout>
      </ThemeSwitcher>
    </>
  );
};
