import { css, Global, Theme, useTheme } from '@emotion/react';
import React from 'react';

export const scrollbarStyles = (theme: Theme) => {
  const colors = theme.modes[theme.mode];
  const getColor = theme._getColorValue;

  return css({
    scrollbarColor: `var(--color-${colors.scrollbar}, ${getColor(
      colors.scrollbar
    )}) var(--color-${colors['background-current']}, ${getColor(
      colors['background-current']
    )})`,
    scrollbarWidth: `thin`,

    '&::-webkit-scrollbar': {
      backgroundColor: `transparent`,
      width: `.75em`,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: `
      var(--color-${colors['background-current']},
      ${getColor(colors['background-current'])}
      )`,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `var(--color-${colors.scrollbar}, ${getColor(
        colors.scrollbar
      )})`,
      borderRadius: `20px`,
      border: `3px solid var(--color-${
        colors['background-current']
      }, ${getColor(colors['background-current'])})`,
    },
  });
};

export const Scrollbars = () => {
  const theme = useTheme();

  return (
    <Global
      styles={{
        [`html, body`]: scrollbarStyles(theme),
      }}
    />
  );
};
