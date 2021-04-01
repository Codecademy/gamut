import { Markdown, Text } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
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
  const {
    colorModes: { active },
  } = useTheme();
  const titleColors = active === 'dark' ? 'lightBlue' : 'navy';

  return (
    <>
      <Text as="strong" fontFamily="accent" textColor={titleColors}>
        Article
      </Text>
      <Text as="h1" lineHeight="base" textColor={titleColors}>
        {title}
      </Text>
      <Text as="h2" fontSize={22} fontWeight="base" textColor={titleColors}>
        {description}
      </Text>
      <Markdown text={content} />
    </>
  );
};
