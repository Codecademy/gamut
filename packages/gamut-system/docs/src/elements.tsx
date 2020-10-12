/* eslint-disable react/jsx-key */
import React, { useContext } from 'react';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { MultiTheme } from './pages/base';
import { spacing, styled, typography } from './system';
import { syntaxTheme } from './theme/syntax';

export const ListItem = styled.li`
  ${compose(spacing, typography)}
`;

ListItem.defaultProps = {
  fontSize: 2,
  lineHeight: 'base',
};

type ListProps = { listStyle?: 'regular' | 'menu' } & HandlerProps<
  typeof spacing
>;

export const List = styled.ul<ListProps>`
  ${spacing}
  ${({ listStyle = 'regular', theme }) =>
    listStyle === 'regular'
      ? css`
          list-style-position: inside;
          padding-left: ${theme.space[8]};
          list-style-type: disc;
        `
      : css`
          text-transform: uppercase;
        `}
  > li {
    padding-left: ${({ theme }) => theme.space[12]}px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
`;

export const Th = styled.th`
  font-family: ${({ theme }) => theme.fontFamily.base};
  font-size: ${({ theme }) => theme.fontSize[3]}px;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.backgroundColor.contrast};
`;

export const Td = styled.td`
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-size: ${({ theme }) => theme.fontSize[1]}px;
  padding: ${({ theme }) => theme.space[4]}px ${({ theme }) => theme.space[0]};
`;

export const Tr = styled.tr`
  &::first-of-type {
    > * {
      padding-top: ${({ theme }) => theme.space[8]}px;
    }
  }
`;

export const Code = styled.code`
  color: ${({ theme }) => theme.textColor.accent};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  font-size: 0.8em;
`;

export const Pre = styled.pre`
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-size: ${({ theme }) => theme.fontSize[1]}px;
  padding: ${({ theme }) => theme.space[24]}px;
`;

export const Line = styled.div`
  display: table-row;
`;

export const Highlighter = ({ children }) => {
  const { theme } = useContext(MultiTheme);
  const activeTheme = syntaxTheme[theme];
  return (
    <Highlight
      {...defaultProps}
      theme={activeTheme}
      code={children.props.children.trim()}
      language={children.props.className.replace('language-', '')}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre
          className={className}
          style={{
            ...style,
          }}
        >
          {tokens.map((line, i) => (
            <Line {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};
