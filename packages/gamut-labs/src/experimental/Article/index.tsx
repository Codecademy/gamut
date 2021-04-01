import { Markdown, Text } from '@codecademy/gamut';
import React from 'react';

export type ArticleProps = {
  title: string;
  description: string;
  content: string;
};

export const Article: React.FC<ArticleProps> = ({
  children,
  title,
  description,
  content,
}) => {
  return (
    <>
      <Text as="strong" fontFamily="accent">
        Article
      </Text>
      <Text as="h1" lineHeight="base">
        {title}
      </Text>
      <Text as="h2" fontSize={22} fontWeight="base">
        {description}
      </Text>
      <Markdown text={content} />
    </>
  );
};
