import { css, Global, Theme, useTheme } from '@emotion/react';
import React from 'react';

export const scrollbarStyles = (theme: Theme) => {
  const colors = theme.modes[theme.mode];
  const getColor = theme._getColorValue;

  return css({
    scrollbarColor: `${getColor(colors.scrollbar)} ${getColor(
      colors['background-current']
    )}`,
    scrollbarWidth: `thin`,

    '&::-webkit-scrollbar': {
      background: `transparent`,
      width: `.75em`,
    },

    '&::-webkit-scrollbar-track': {
      background: `${getColor(colors['background-current'])}`,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${getColor(colors.scrollbar)}`,
      borderRadius: `20px`,
      border: `3px solid ${getColor(colors['background-current'])}`,
    },
  });
};

export const Scrollbars = () => {
  const theme = useTheme();

  return (
    <Global
      styles={{
        [`*`]: scrollbarStyles(theme),
      }}
    />
  );
};
