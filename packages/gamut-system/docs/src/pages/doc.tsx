import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { Layout } from '../templates/layout';
import { mdxComponents } from '../elements/Markdown';

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      body
    }
  }
`;

// eslint-disable-next-line import/no-default-export
export default (props) => {
  const { body } = props.data.mdx;
  return (
    <Layout {...props}>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer scope={{}}>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};
