import { Box, FloatingCard, Text } from '@codecademy/gamut';
import {
  Background,
  ColorMode,
  modeColorProps,
  system,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import darkQuotes from '../assets/navyQuotes.svg';
import { Byline } from '../Byline';

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
      gridTemplateColumns: 'max-content max-content 1fr',
      gridTemplateRows: 'repeat(max-content, 4)',
      gap: 16,
    },
    variants: {
      horizontal: {
        gridTemplateAreas: {
          _: gridLayouts.vertical,
          sm: gridLayouts.horizontal,
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
    hideAvatar?: boolean;
  };

const deleteThis =
  'data:image/jpeg;base64,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';

export const Testimonial: React.FC<TestimonialProps> = ({
  variant,
  hideAvatar,
  mode,
  ...rest
}) => {
  const isVerticleLayout = variant === 'vertical';

  return (
    <TestimonialCard
      {...rest}
      p={32}
      minWidth="22rem"
      width="100%"
      height="100%"
      mode={mode}
    >
      <ColorMode mode={mode || 'light'}>
        <TestimonialContent variant={variant}>
          {!hideAvatar && (
            <TestimonialPicture src={deleteThis} alt="testimonial" />
          )}
          <Box
            pt={{ _: 32, sm: isVerticleLayout && !hideAvatar ? 32 : 0 }}
            mr={32}
            gridArea={!hideAvatar ? 'byline' : 'avatar'}
          >
            <Byline
              firstName="Ricky"
              occupation="Supervisor"
              company="Sunnyvale"
            />
          </Box>
          <QuoteArt src={darkQuotes} />
          <Text
            pt={{ _: 0, sm: isVerticleLayout ? 0 : 4 }}
            gridArea="text"
            variant="title-md"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            fugit doloremque dolores repudiandae quam exercitationem voluptatum
            labore non excepturi, nisi corporis, suscipit sed accusantium
            veritatis aliquam incidunt quos quasi illo.
          </Text>
        </TestimonialContent>
      </ColorMode>
    </TestimonialCard>
  );
};
