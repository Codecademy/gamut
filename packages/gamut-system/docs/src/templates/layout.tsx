import React, { useMemo } from 'react';
import { Box, Container } from '../elements/Box';
import { graphql, useStaticQuery } from 'gatsby';
import { NavigationMenu } from '../components/NavigationMenu';

const query = graphql`
  query {
    allMdx {
      edges {
        node {
          id
          slug
          tableOfContents
        }
      }
    }
  }
`;

const ORDER = [
  'getting-started',
  'properties',
  'variants',
  'responsive',
  'customization',
  'composition',
];

export const Layout: React.FC<{
  location: { pathname: string; hash: string };
}> = ({ children, location }) => {
  const data = useStaticQuery(query);

  const links = useMemo(() => {
    const mdx = data.allMdx.edges.map(
      ({ node: { id, slug, tableOfContents } }) => ({
        id,
        slug,
        links: tableOfContents.items[0].items || [],
      })
    );

    return ORDER.map((slug) => mdx.find((doc) => doc.slug === slug));
  }, [data]);

  const activePath = useMemo(() => location.pathname.replace(/\//g, ''), [
    location.pathname,
  ]);

  return (
    <Box colorVariant="primary">
      <Container height="100vh" display="flex" justifyContent="center">
        <Container width="1" display="flex">
          <Container minWidth="250" display={{ base: 'none', lg: 'block' }} />
          <NavigationMenu links={links} activeRoute={activePath} />
          <Container
            width="100%"
            display="flex"
            justifyContent="center"
            overflowY="auto"
          >
            <Container
              paddingX={32}
              paddingTop={{ base: 32, lg: 0 }}
              maxWidth="1200px"
              width="100%"
            >
              {children}
              <Container paddingBottom={32} />
            </Container>
          </Container>
        </Container>
      </Container>
    </Box>
  );
};

export default Layout;
