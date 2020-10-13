import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { useTheme } from 'emotion-theming';
import { Theme } from '../theme';
import { ClassNames } from '@emotion/core';

export const Link: React.FC<{ to?: string }> = ({ to, children }) => {
  const theme = useTheme<Theme>();

  return (
    <ClassNames>
      {({ css }) => (
        <GatsbyLink
          to={to}
          className={css`
            font-family: inherit;
            text-decoration: none;
            color: ${theme.textColor.primary};

            &:hover,
            :active {
              color: ${theme.textColor.accent};
            }
            &:hover,
            :focus,
            :active {
              outline-offset: ${theme.space[8]}px;
              outline-color: ${theme.textColor.accent};
            }
          `}
          activeStyle={{
            fontWeight: theme.fontWeight.heading,
            color: theme.textColor.accent,
          }}
        >
          {children}
        </GatsbyLink>
      )}
    </ClassNames>
  );
};
