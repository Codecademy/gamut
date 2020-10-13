import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../templates/layout';
import { Markdown } from '../elements/Markdown';

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
      <Markdown>{body}</Markdown>
    </Layout>
  );
};
