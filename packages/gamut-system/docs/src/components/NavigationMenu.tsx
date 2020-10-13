import React from 'react';
import { useState } from 'react';
import { Box, Container } from '../elements/Box';
import { Link } from '../elements/Link';
import { List, ListItem } from '../elements/List';
import { Text } from '../elements/Text';

export const NavigationMenu = ({
  links,
  activeRoute,
}: {
  links: any;
  activeRoute: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        colorVariant="primary"
        borderStyle="none"
        padding={4}
        as="button"
        position="fixed"
        width="2.5rem"
        height="2.5rem"
        display={{ base: 'flex', lg: 'none' }}
        top="0.8rem"
        left="0.8rem"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-around"
      >
        <Container borderStyle="solid" borderWidth={2} />
        <Container borderStyle="solid" borderWidth={2} />
        <Container borderStyle="solid" borderWidth={2} />
      </Box>
      <Box
        borderVariant="bordered"
        colorVariant="primary"
        borderStyle={{ base: 'solid', lg: 'none' }}
        borderWidth={{ base: 1, lg: 0 }}
        display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}
        position="fixed"
        left={{ base: '0rem', lg: '3rem' }}
        top={{ base: '5rem', lg: '2rem' }}
      >
        <Container paddingBottom={8} display={{ base: 'none', lg: 'block' }}>
          <Link to="/">
            <Text
              as="h1"
              fontFamily="accent"
              fontSize={5}
              fontWeight="heading"
              paddingLeft={8}
            >
              Gamut System
            </Text>
          </Link>
        </Container>
        <List listStyle="menu">
          {links.map(({ id, slug, links: subLinks }) => {
            const isActive = activeRoute === slug;
            return (
              <ListItem fontWeight="heading" key={id} padding={4}>
                <Link to={`/${slug}`}>{slug.replace('-', ' ')}</Link>
                {Boolean(isActive && subLinks.length) && (
                  <List paddingTop={8} listStyle="menu">
                    {subLinks.map(({ url, title }) => {
                      return (
                        <ListItem
                          fontWeight="base"
                          padding={4}
                          paddingX={0}
                          fontSize={1}
                          key={`${id}-${title}`}
                        >
                          <Link to={url}>{title}</Link>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
};
