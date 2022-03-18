import { css, Global, Theme, useTheme } from '@emotion/react';
import React from 'react';

export const scrollbarStyles = (theme: Theme) => {
  const colors = theme.modes[theme.mode];

  return css({
    scrollbarColor: `var(--color-${colors.scrollbar}) var(--color-${colors['background-current']})`,
    scrollbarWidth: `thin`,

    '&::-webkit-scrollbar': {
      backgroundColor: `transparent`,
      width: `.75em`,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: `var(--color-${colors['background-current']})`,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `var(--color-${colors.scrollbar})`,
      borderRadius: `20px`,
      border: `3px solid var(--color-${colors['background-current']})`,
    },
  });
};

export const Scrollbars = () => {
  const theme = useTheme();
  const hasGlobalBg = document.documentElement.style.getPropertyValue(
    '--has-global-background'
  );

  if (hasGlobalBg) return null;

  document.documentElement.style.setProperty('--has-global-background', 'true');

  return (
    <Global
      styles={{
        [`html, body`]: scrollbarStyles(theme),
      }}
    />
  );
};
