import { FlexBox, Markdown, MarkdownProps, Text } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

export type ArticleProps = {
  title: string;
  description: string;
  content: string;
  socialIcons?: ReactElement;
  mdProps?: MarkdownProps;
};

const ResetMarkdown = styled(Markdown)``;

const Reset = styled.div`
  ${ResetMarkdown} {
    color: ${themed('colors.text')};

    > *:not(pre):not(code):not(.overrideWidth) {
      max-width: 50%;
    }

    > pre {
      padding: ${themed('spacing.16')};
      background-color: ${themed('colors.codeBlockBg')};
    }

    code {
      border-radius: 2px;
      padding: 2px 4px;
      color: ${themed('colors.codeText')};
      background-color: ${themed('colors.codeBg')};
    }
  }
`;

export const Article: React.FC<ArticleProps> = ({
  title,
  description,
  content,
  socialIcons,
  mdProps,
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
      <Text as="h2" fontSize={22} fontWeight="base" textColor={titleColors}>
        {description}
      </Text>
      {socialIcons ? (
        <FlexBox justifyContent="flex-end" marginY={16}>
          {socialIcons}
        </FlexBox>
      ) : null}
      <ResetMarkdown text={content} {...mdProps} />
    </Reset>
  );
};
