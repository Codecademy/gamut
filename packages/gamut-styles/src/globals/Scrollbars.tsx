import { css, Theme } from '@emotion/react';

export const scrollbarStyles = (theme: Theme) => {
  return css({
    scrollbarColor: `${theme.colors.scrollbar} ${theme.colors['background-current']}`,
    scrollbarWidth: `thin`,

    '&::-webkit-scrollbar': {
      backgroundColor: `transparent`,
      width: `.75em`,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.colors['background-current'],
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.colors.scrollbar,
      borderRadius: `20px`,
      border: `3px solid ${theme.colors['background-current']}`,
    },
  });
};
