import React, { useContext, useMemo } from 'react';
import { Box, Container } from '../components/Box';
import { Heading } from '../components/Text';
import { graphql, useStaticQuery } from 'gatsby';
import { List, ListItem } from '../components/elements';
import { MultiTheme } from './base';
import { Link } from '../components/Link';

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

const Navigation = ({
  links,
  activeRoute,
}: {
  links: any;
  activeRoute: string;
}) => {
  return (
    <List listStyle="menu">
      {links.map(({ id, slug, links: subLinks }: any) => {
        const isActive = activeRoute === slug;
        return (
          <ListItem fontWeight="heading" key={id} padding={4}>
            <Link to={`/${slug}`}>{slug}</Link>
            {Boolean(isActive && subLinks.length) && (
              <List paddingTop={8} listStyle="menu">
                {subLinks.map(({ url, title }: any) => (
                  <ListItem
                    fontWeight="base"
                    padding={4}
                    paddingX={0}
                    fontSize={1}
                    key={`${id}-${title}`}
                  >
                    <Link to={`/${slug}${url}`}>{title}</Link>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export const Layout: React.FC<{
  location: { pathname: string };
}> = ({ children, location }) => {
  const { theme, toggleTheme } = useContext(MultiTheme);
  const data = useStaticQuery(query);
  const links = useMemo(() => {
    return data.allMdx.edges.map(({ node: { id, slug, tableOfContents } }) => ({
      id,
      slug,
      links: tableOfContents.items[0].items || [],
    }));
  }, [data]);
  const activeSlug = useMemo(() => location.pathname.replace('/', ''), [
    location.pathname,
  ]);

  return (
    <Box colorVariant="primary">
      <Box
        colorVariant="primary"
        borderVariant="bordered"
        position="fixed"
        right="2rem"
        top="1rem"
        padding={8}
        onClick={() => {
          toggleTheme(theme);
        }}
      >
        {theme}
      </Box>
      <Container height="100vh" display="flex" justifyContent="center">
        <Container width="1" display="flex">
          <Container
            height="100vh"
            borderStyle="solid"
            minWidth="250"
            borderWidth={0}
            borderWidthRight={2}
            paddingTop={32}
            padding={12}
          >
            <Heading
              as="h1"
              margin={0}
              hSize="5"
              fontWeight="heading"
              paddingLeft={8}
            >
              Gamut System
            </Heading>
            <Container paddingY={8}>
              <Navigation links={links} activeRoute={activeSlug} />
            </Container>
          </Container>
          <Container
            width="100%"
            maxHeight="100vh"
            display="flex"
            justifyContent="center"
            overflowY="auto"
          >
            <Container paddingX={32} maxWidth="1200px" width="100%">
              {children}
              <Container paddingBottom={32} />
            </Container>
          </Container>
        </Container>
      </Container>
    </Box>
  );
};
