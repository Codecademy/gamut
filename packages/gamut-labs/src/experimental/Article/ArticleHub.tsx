import { Card, GridBox, Text } from '@codecademy/gamut';
import React from 'react';

type ArticleShape = {
  id: string;
  title: string;
  type: string;
  slug: string;
  description: string;
};

type ArticleHubProps = {
  articles: ArticleShape[];
};

export const ArticleHub: React.FC<ArticleHubProps> = ({ articles }) => {
  return (
    <>
      <Text as="h1">All Articles</Text>
      <GridBox
        paddingTop={32}
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        rowGap={32}
        columnGap={32}
      >
        {articles.map(({ title, description }) => (
          <Card shadowOffset={4} padding={24}>
            <GridBox rowGap={16}>
              <Text as="h2" fontSize={22}>
                {title}
              </Text>
              <Text as="p" overflow="hidden" maxHeight={`${1.5 * 16 * 3}px`}>
                {description}
              </Text>
            </GridBox>
          </Card>
        ))}
      </GridBox>
    </>
  );
};
