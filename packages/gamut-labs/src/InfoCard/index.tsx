import { Anchor, Box, Card, Text, Truncate } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import { Theme } from '@emotion/react';
import React from 'react';

const cardMinWidth = 250;

export type TagColor = 'blue' | 'green' | 'pink';
const tagColorMap: Record<TagColor, keyof Theme['colors']> = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: 'palePink',
};

type TextProps = {
  text: string;
};

type BottomRightTagProps = {
  text: string;
  color: TagColor;
};

const TopText: React.FC<TextProps> = ({ text }) => (
  <Text
    display="flex"
    fontSize={14}
    mb={12}
    fontFamily="accent"
    textTransform="capitalize"
  >
    {text}
  </Text>
);

const Title: React.FC<TextProps> = ({ text }) => (
  <Text as="h3" mb={4} fontSize={20}>
    <Truncate lines={2}>{text}</Truncate>
  </Text>
);

const Subtitle: React.FC<TextProps> = ({ text }) => (
  <Text variant="p-small" textColor="gray-900">
    <Truncate lines={2}>{text}</Truncate>
  </Text>
);

const Body: React.FC<TextProps> = ({ text }) => (
  <Text pt={16} variant="p-small" textColor="gray-900">
    <Truncate lines={3}>{text}</Truncate>
  </Text>
);

const BottomLeftText: React.FC<TextProps & { hasBottomRightTag: boolean }> = ({
  text,
  hasBottomRightTag,
}) => (
  <Box
    position="absolute"
    bottom={0}
    left={0}
    maxWidth={hasBottomRightTag ? '57%' : '100%'}
  >
    <Text pl={16} variant="p-small" textColor="gray-900">
      {text}
    </Text>
  </Box>
);

const BottomRightTag: React.FC<BottomRightTagProps> = ({ text, color }) => (
  <Box position="absolute" bottom={0} right={0} bg={tagColorMap[color]}>
    <Text py={4} p={12} variant="title-xs" fontSize={14}>
      {text}
    </Text>
  </Box>
);

export type InfoCardProps = {
  href: string;
  onClick?: () => void;
  topText: string;
  title: string;
  subtitle: string;
  body?: string;
  bottomLeftText?: string;
  bottomRightTagText?: string;
  bottomRightTagColor?: TagColor;
  cardHeight?: string | number;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  href,
  onClick,
  topText,
  title,
  subtitle,
  body,
  bottomLeftText,
  bottomRightTagText,
  bottomRightTagColor = 'pink',
  cardHeight = 285,
}) => {
  return (
    <Anchor variant="interface" href={href} onClick={() => onClick?.()}>
      <Card
        display="grid"
        gridTemplateRows="repeat(3, max-content) 1fr max-content"
        height={pxRem(cardHeight)}
        minWidth={pxRem(cardMinWidth)}
        variant="white"
        shadow="medium"
        position="relative"
      >
        <TopText text={topText} />
        <Title text={title} />
        <Subtitle text={subtitle} />
        {body && <Body text={body} />}
        {bottomLeftText && (
          <BottomLeftText
            text={bottomLeftText}
            hasBottomRightTag={Boolean(bottomRightTagText)}
          />
        )}
        {bottomRightTagText && (
          <BottomRightTag
            text={bottomRightTagText}
            color={bottomRightTagColor}
          />
        )}
      </Card>
    </Anchor>
  );
};
