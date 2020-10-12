import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { Heading, Text } from '../components/Text';
import {
  Code,
  Highlighter,
  Table,
  Td,
  Th,
  Tr,
  List,
  ListItem,
} from '../components/elements';
import { Link } from '../components/Link';

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      body
    }
  }
`;

const generateId = ({ children }: { children: string }) =>
  children.toLowerCase().split(' ').join('-');

// eslint-disable-next-line import/no-default-export
export default (props: any) => {
  const { body } = props.data.mdx;
  return (
    <MDXProvider
      components={{
        pre: Highlighter,
        a: ({ children, href }: any) => (
          <Link to={href.replace('/#', '#')}>{children}</Link>
        ),
        ul: List,
        li: ListItem,
        inlineCode: Code,
        table: Table,
        th: Th,
        td: Td,
        tr: Tr,
        p: (props: any) => <Text marginBottom={16}>{props.children}</Text>,
        h1: (props: any) => (
          <Heading
            as="h1"
            hSize="3"
            marginTop={32}
            marginBottom={16}
            id={generateId(props)}
            {...props}
          />
        ),
        h2: (props: any) => (
          <Heading
            as="h2"
            hSize="4"
            marginTop={32}
            marginBottom={16}
            id={generateId(props)}
            {...props}
          />
        ),
        h3: (props: any) => (
          <Heading
            as="h3"
            hSize="5"
            marginTop={16}
            marginBottom={8}
            id={generateId(props)}
            {...props}
          />
        ),
        h4: (props: any) => (
          <Heading
            as="h4"
            hSize="6"
            marginTop={16}
            marginBottom={8}
            id={generateId(props)}
            {...props}
          />
        ),
        h5: (props: any) => (
          <Heading
            as="h5"
            hSize="6"
            marginTop={16}
            marginBottom={8}
            id={generateId(props)}
            {...props}
          />
        ),
        h6: (props: any) => (
          <Heading
            as="h6"
            hSize="6"
            marginTop={16}
            marginBottom={8}
            id={generateId(props)}
            {...props}
          />
        ),
      }}
    >
      <MDXRenderer scope={{}}>{body}</MDXRenderer>
    </MDXProvider>
  );
};
