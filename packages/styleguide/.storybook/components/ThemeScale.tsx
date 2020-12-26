import React, { Fragment, ReactNode } from 'react';
import { css, styled, useTheme } from '@storybook/theming';
import { allProps, variant } from './styles';

const cols = {
  prop: 'minmax(4rem, max-content)',
  path: 'minmax(8rem, max-content)',
  value: 'minmax(8rem, max-content)',
  example: 'minmax(16rem, 1fr)',
};
const rowVariants = variant({
  prop: 'columns',
  variants: {
    '4': {
      gridTemplateColumns: `${cols.prop} ${cols.path} ${cols.value} ${cols.example}`,
    },
    '3': {
      gridTemplateColumns: `${cols.prop} ${cols.path} ${cols.example}`,
    },
    '2': {
      gridTemplateColumns: `${cols.prop}  ${cols.example}`,
    },
  },
});
export const Table = styled.div<{ columns: '2' | '3' | '4' }>(
  (props) => css`
    ${rowVariants(props)}
    font-family: ${props.theme.fontBase};
    display: grid;
    column-gap: 2rem;
  `
);

Table.defaultProps = {
  columns: '2',
};

const Row = styled.div<{ columns?: '2' | '3' | '4'; header?: boolean }>`
  display: contents;
  position: relative;

  &:after {
    content: '';
    grid-column: span ${({ columns }) => columns};
    border-bottom: ${({ header }) =>
      header ? '1px solid #000000' : '1px solid #eeeeee'};
  }

  &:last-child {
    &:after {
      border: none;
    }
  }
`;

Row.defaultProps = {
  columns: '2',
};

export const Column = styled.div`
  padding: 1rem 0;
  display: grid;
  align-items: start;
  justify-content: start;
  ${variant({
    heading: {
      fontWeight: 'bold',
    },
  })}
`;

export const Code = styled.code(({ theme }) => {
  return css`
    font-family: ${theme.fontCode};
    max-width: 100%;
    overflow-x: scroll;
    line-height: 1;
    padding: 3px 5px;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 13px;
    border: 1px solid #eeeeee;
    color: rgba(51, 51, 51, 0.8);
    background-color: #f8f8f8;
  `;
});

export const Example = styled.div(allProps);

const rendersSimplePath = (value: string, key: string, prop?: string) => {
  const lookup =
    key.length !== `${parseInt(key)}`.length ? `.${key}` : `[${key}]`;

  return (
    <Code>
      theme.{prop}
      {lookup}
    </Code>
  );
};

const renderSimpleValue = (val) => <Code>{val}</Code>;

export const ColorScale: React.FC<{ colors: Record<string, string> }> = ({
  colors,
}) => {
  const { fontCode, ...hello } = useTheme();
  const numberOfColors = Object.keys(colors).length;
  const getRadius = (index) => {
    if (numberOfColors === 1) {
      return '5px';
    }
    if (index === 0) {
      return '5px 0 0 5px';
    }
    if (index + 1 === numberOfColors) {
      return '0 5px 5px 0';
    }
    return '0';
  };

  return (
    <>
      <Example
        display="grid"
        minWidth="700px"
        maxWidth="100%"
        gridAutoFlow="column"
        gridAutoColumns="1fr"
        borderRadius="5px"
        boxShadow="rgba(0,0,0,0.10) 0 1px 3px 0"
      >
        {Object.entries(colors).map(([weight, color], index) => {
          return (
            <Example
              key="color"
              minHeight="3rem"
              backgroundColor={color}
              borderRadius={getRadius(index)}
            />
          );
        })}
      </Example>
      <Example
        fontFamily={fontCode}
        fontSize="12px"
        textColor="rgba(51,51,51,0.5)"
        display="grid"
        minWidth="500px"
        gridAutoFlow="column"
        gridAutoColumns="1fr"
      >
        {Object.entries(colors).map(([weight, color], index) => {
          return (
            <Example padding="0.25rem" textAlign="center">
              <div>{weight}</div>
              <div>{color}</div>
            </Example>
          );
        })}
      </Example>
    </>
  );
};

export const ThemeScale: React.FC<{
  prop: string;
  scale: Record<string, any>;
  renderPath?: (
    value: string,
    key?: string,
    prop?: string
  ) => ReactNode | string;
  renderValue?: (value: string, key?: string) => ReactNode | string;
  renderExample?: (value: unknown, key?: string) => ReactNode | string;
}> = ({
  scale,
  prop,
  renderExample,
  renderValue = renderSimpleValue,
  renderPath = rendersSimplePath,
}) => {
  const cols = renderExample ? '4' : '3';
  return (
    <Table columns={cols}>
      <Row columns={cols} header>
        <Column variant="heading">Prop</Column>
        <Column variant="heading">Path</Column>
        <Column variant="heading">Value</Column>
        {renderExample && <Column variant="heading">Example</Column>}
      </Row>
      {Object.entries(scale).map(([key, value]) => (
        <Row key={key} columns={cols}>
          <Column>
            <Code>{key}</Code>
          </Column>
          <Column>{renderPath(value, key, prop)}</Column>
          <Column>{renderValue(value, key)}</Column>
          {renderExample && <Column>{renderExample(value, key)}</Column>}
        </Row>
      ))}
    </Table>
  );
};
