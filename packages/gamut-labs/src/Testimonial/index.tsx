import { Anchor, Box, FloatingCard, Text } from '@codecademy/gamut';
import { modeColorProps, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import darkQuotes from '../assets/navyQuotes.svg';

const QuoteArt = styled.img`
  height: 25px;
  grid-area: art;
`;

const TestimonialPicture = styled.img`
  height: 98px;
  width: 98px;
  border-radius: 70px;
  grid-area: avatar;
`;
const TestimonialCard = styled(FloatingCard)(modeColorProps);

const gridLayouts = {
  vertical: `'art art art'
             'text text text'
             'avatar byline byline'
             'avatar byline byline'
             `,
  horizontal: `'avatar art text'
               'byline art text'
               'byline art text'
               'byline art text'
               `,
};

const TestimonialContent = styled(Box)(
  system.variant({
    defaultVariant: 'horizontal',
    base: {
      display: 'grid',
      color: 'text-accent',
      gridTemplateColumns: 'max-content max-content 1fr',
      gridTemplateRows: 'repeat(max-content, 4)',
      gap: 16,
    },
    variants: {
      horizontal: {
        gridTemplateAreas: {
          _: gridLayouts.vertical,
          md: gridLayouts.horizontal,
        },
      },
      vertical: {
        gridTemplateAreas: gridLayouts.vertical,
      },
    },
  })
);

export type TestimonialProps = ComponentProps<typeof TestimonialCard> &
  ComponentProps<typeof TestimonialContent> & {
    firstName: string;
    lastName: string;
    occupation: string;
    quote: string;
    location: string;
    /**
     * Associated workplace or institution
     */
    company?: string;
    /**
     * An avatar portrait
     */
    imageUrl?: string;
    /**
     * A long quote to replace the text with at SM viewports and higher.
     */
    href?: string;
    onClick?: () => void;
    hideAvatar?: boolean;
  };

export const Testimonial: React.FC<TestimonialProps> = ({
  firstName,
  lastName,
  company,
  occupation,
  location,
  href,
  quote,
  onClick,
  hideAvatar,
  imageUrl,
  variant,
  mode,
  ...rest
}) => {
  const isVerticleLayout = variant === 'vertical';

  return (
    <Anchor href={href} variant="interface" onClick={onClick}>
      <TestimonialCard
        {...rest}
        p={32}
        minWidth="22rem"
        width="100%"
        height="100%"
        mode={mode}
      >
        <TestimonialContent variant={variant}>
          {!hideAvatar && (
            <TestimonialPicture src={imageUrl} alt="testimonial" />
          )}
          <Box
            pt={{ _: 32, sm: isVerticleLayout && !hideAvatar ? 24 : 0 }}
            mr={32}
            gridArea={!hideAvatar ? 'byline' : 'avatar'}
          >
            <Text
              variant="p-small"
              fontFamily="accent"
              textDecoration="underline"
              as="p"
            >
              {`${firstName} ${lastName[0]}.`}
            </Text>
            <Text variant="p-small" as="p">
              {occupation}
            </Text>
            <Text variant="p-small" as="p">
              {`@ ${company}${location ? `, ${location}` : ''}`}
            </Text>
          </Box>
          <QuoteArt src={darkQuotes} />
          <Text
            pt={{ _: 0, sm: isVerticleLayout ? 0 : 4 }}
            gridArea="text"
            variant="title-md"
            as="p"
          >
            {quote}
          </Text>
        </TestimonialContent>
      </TestimonialCard>
    </Anchor>
  );
};
