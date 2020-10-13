import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { useTheme } from 'emotion-theming';
import { Theme } from '../theme';
import { ClassNames } from '@emotion/core';

export const Link: React.FC<{ to?: string; partiallyActive?: boolean }> = ({
  to,
  children,
}) => {
  const theme = useTheme<Theme>();

  return (
    <ClassNames>
      {({ css }) => (
        <GatsbyLink
          to={to}
          getProps={(props) => {
            const { href, location } = props;
            const activePath = `${href}/`.indexOf(location.pathname) > -1;
            const activeHash =
              !(href.indexOf('#') >= 0) ||
              (href.indexOf('#') > -1 && href.indexOf(location.hash) > 0);

            const isActive = activePath && activeHash;

            return (
              isActive && {
                style: {
                  fontWeight: theme.fontWeight.heading,
                  color: theme.textColor.accent,
                },
              }
            );
          }}
          className={css`
            display: inline-block;
            width: 100%;
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
        >
          {children}
        </GatsbyLink>
      )}
    </ClassNames>
  );
};
