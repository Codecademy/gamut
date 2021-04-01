import { Markdown, Text } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export type ArticleProps = {
  title: string;
  description: string;
  content: string;
};

const ResetMarkdown = styled(Markdown)``;

const Reset = styled.div`
  ${ResetMarkdown} {
    color: ${themed('colors.text')};

    > *:not(pre):not(code) {
      max-width: 60%;
    }

    pre {
      background-color: ${themed('colors.codeBlockBg')};
      padding: ${themed('spacing.12')};
    }

    code {
      color: ${themed('colors.codeText')};
      background-color: ${themed('colors.codeBg')};
    }
  }
`;

export const Article: React.FC<ArticleProps> = ({
  title,
  description,
  content,
}) => {
  const {
    colorModes: { active },
  } = useTheme();
  const titleColors = active === 'dark' ? 'lightBlue' : 'navy';

  return (
    <Reset>
      <Text as="strong" fontFamily="accent" textColor={titleColors}>
        Article
      </Text>
      <Text as="h1" lineHeight="base" textColor={titleColors}>
        {title}
      </Text>
      <Text
        as="h2"
        fontSize={20}
        lineHeight="base"
        fontWeight="base"
        textColor={titleColors}
      >
        {description}
      </Text>
      <ResetMarkdown text={content} />
    </Reset>
  );
};
