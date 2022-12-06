import { Anchor, Box, FloatingCard, Text } from '@codecademy/gamut';
import { modeColorProps, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, useMemo } from 'react';
import * as React from 'react';

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
      gridTemplateColumns: 'repeat(2, minmax(0, max-content)) minmax(0, 1fr);',
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
    lastName?: string;
    quote: string;
    /**
     * City location
     */
    location?: string;
    /**
     * associated occupation of the person.
     */
    occupation?: string | null;
    /**
     * Associated workplace or institution
     */
    company?: string | null;
    /**
     * Portrait image src
     */
    imageUrl?: string | null;
    /**
     * setting this href will wrap the testimonial card with an anchor tag.
     */
    href?: string | null;
    /**
     * used to conditonally hide the portrait photo
     */
    hidePhoto?: boolean;
    onClick?: () => void;
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
  hidePhoto,
  imageUrl,
  variant,
  mode,
  ...rest
}) => {
  const isVerticleLayout = variant === 'vertical';

  const bottomText: string = useMemo(() => {
    if (company && location) return `@ ${company}, ${location}`;
    if (!company && location) return `${location}`;
    if (company && !location) return `@ ${company}`;
    return '';
  }, [company, location]);

  const ariaLabel = `${firstName} ${lastName} ${bottomText}. ${quote}`;

  const renderTestimonial = () => (
    <TestimonialCard {...rest} p={32} width="100%" height="100%" mode={mode}>
      <TestimonialContent variant={variant}>
        {!hidePhoto && imageUrl && (
          <TestimonialPicture
            data-testid="testimonial-photo"
            src={imageUrl}
            alt="testimonial"
          />
        )}
        <Box
          my={{ _: 'auto', md: isVerticleLayout && !hidePhoto ? 'auto' : 0 }}
          mr={32}
          gridArea={!hidePhoto ? 'byline' : 'avatar'}
        >
          <Text variant="p-small" as="p" fontFamily="accent">
            {lastName ? `${firstName} ${lastName[0]}.` : `${firstName}`}
          </Text>
          <Text variant="p-small" as="p" fontFamily="accent">
            {occupation}
          </Text>
          {!!bottomText && (
            <Text variant="p-small" as="p" fontFamily="accent">
              {bottomText}
            </Text>
          )}
        </Box>
        <QuoteArt alt="" src={darkQuotes} />
        <Text
          pt={{ _: 0, md: isVerticleLayout ? 0 : 4 }}
          pr={{ _: 16, sm: 0 }}
          gridArea="text"
          variant="title-md"
          as="p"
        >
          {quote}
        </Text>
      </TestimonialContent>
    </TestimonialCard>
  );

  const renderTestimonialWithAnchor = () => (
    <Anchor
      display={rest.display}
      data-testid="testimonial-link"
      href={href}
      variant="interface"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {renderTestimonial()}
    </Anchor>
  );

  return href ? renderTestimonialWithAnchor() : renderTestimonial();
};
