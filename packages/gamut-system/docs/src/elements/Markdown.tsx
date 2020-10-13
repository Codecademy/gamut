import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { Heading, Text } from './Text';
import { Link } from './Link';
import { List, ListItem } from './List';
import { Code, Highlighter } from './Code';
import { Table, Td, Th, Tr } from './Table';

const generateId = ({ children }) =>
  children.toLowerCase().split(' ').join('-');

const components = {
  pre: Highlighter,
  a: ({ children, href }) => (
    <Link to={href.replace('/#', '#')}>{children}</Link>
  ),
  ul: List,
  li: ListItem,
  inlineCode: Code,
  table: Table,
  th: Th,
  td: Td,
  tr: Tr,
  p: (props) => <Text marginBottom={16}>{props.children}</Text>,
  h1: (props) => (
    <Heading
      as="h1"
      hSize="3"
      marginTop={32}
      marginBottom={16}
      id={generateId(props)}
      {...props}
    />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      hSize="4"
      marginTop={32}
      marginBottom={16}
      id={generateId(props)}
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      hSize="5"
      marginTop={16}
      marginBottom={8}
      id={generateId(props)}
      {...props}
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      hSize="6"
      marginTop={16}
      marginBottom={8}
      id={generateId(props)}
      {...props}
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      hSize="6"
      marginTop={16}
      marginBottom={8}
      id={generateId(props)}
      {...props}
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      hSize="6"
      marginTop={16}
      marginBottom={8}
      id={generateId(props)}
      {...props}
    />
  ),
};

export const Markdown = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer scope={{}}>{children}</MDXRenderer>
  </MDXProvider>
);
