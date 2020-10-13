import Highlight, { defaultProps } from 'prism-react-renderer';
import { useContext } from 'react';
import { MultiTheme } from '../base';
import { layout, styled } from '../system';
import { syntaxTheme } from '../theme';

export const Code = styled.code`
  color: ${({ theme }) => theme.textColor.accent};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  font-size: 0.8em;
`;

export const Pre = styled.pre`
  ${layout}
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-size: ${({ theme }) => theme.fontSize[1]}px;
  padding: ${({ theme }) => theme.space[24]}px;
`;

Pre.defaultProps = {
  overflowY: 'auto',
};

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
