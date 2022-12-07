import { Anchor, Box, FlexBox, GridBox, VisualTheme } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import darkQuotes from '../assets/darkQuotes.svg';
import lightQuotes from '../assets/lightQuotes.svg';
import { Avatar } from '../Avatar';
import { Byline } from '../Byline';

const modes = {
  dark: {
    cardBackground: colors.navy,
    textColor: colors.beige,
    quoteIcon: darkQuotes,
  },
  light: {
    cardBackground: colors.beige,
    textColor: colors.navy,
    quoteIcon: lightQuotes,
  },
};

const Shadow = styled(CheckerDense)<{ mode: VisualTheme }>`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  height: calc(100% - 1rem);
  width: calc(100% - 1rem);
  color: ${({ mode }) => modes[mode].cardBackground};
`;

const TestimonialCard = styled(GridBox)();

const TestimonialWrapper = styled(Box)<{ mode: VisualTheme }>`
  height: 100%;

  &:hover {
    ${TestimonialCard} {
      transform: scale(1.02);
    }
  }

  ${TestimonialCard} {
    align-content: center;
    height: 100%;
    ${({ mode }) => `
      background-color: ${modes[mode].cardBackground};
      color: ${modes[mode].textColor};
    `}
    clip-path: inset(0 1rem 1rem 0);
    overflow-y: hidden;
    padding-right: 1rem;
    padding-bottom: 1rem;
    position: relative;
    transition: transform 0.3s ease-in-out;
  }
`;

const QuoteIcon = styled.img`
  display: block;
  margin-bottom: -2.5rem;
`;

const QuoteText = styled.q`
  position: relative;
  quotes: none;
  font-size: ${({ theme }) => theme.fontSize[26]};
  line-height: ${({ theme }) => theme.lineHeight.base};
`;

export type TestimonialDeprecatedProps = {
  firstName: string;
  lastName: string;
  occupation: string;
  quote: string;
  mode: VisualTheme;
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
  longQuote?: string;
  href?: string;
  onClick?: () => void;
};
/**
 * @deprecated  This component is deprecated and will be updated soon.
 *
 * Please check the gamut board for updates on the new version of Testimonial
 */

export const TestimonialDeprecated: React.FC<TestimonialDeprecatedProps> = ({
  firstName,
  lastName,
  occupation,
  quote,
  mode = 'light',
  company,
  imageUrl,
  longQuote,
  href,
  onClick,
}) => {
  return (
    <TestimonialWrapper position="relative" mode={mode}>
      <Shadow name="checkerDense" mode={mode} />
      <Anchor
        href={href}
        variant="interface"
        display="block"
        height="inherit"
        onClick={onClick}
      >
        <TestimonialCard>
          <FlexBox
            px={{ _: 24 }}
            pt={{ _: 32 }}
            pb={{ _: 48 }}
            flexWrap="wrap"
            alignItems="start"
            textColor={mode === 'dark' ? 'beige' : 'navy'}
          >
            <FlexBox flexDirection="column">
              {imageUrl && (
                <Box width="77px" height="77px" mb={48} mr={16}>
                  <Avatar alt="" src={imageUrl} mode={mode} />
                </Box>
              )}
              <Box mb={16} mr={16} minWidth="9.5rem">
                <Byline
                  firstName={firstName}
                  occupation={occupation}
                  company={company}
                  lastName={lastName}
                />
              </Box>
            </FlexBox>
            <Box flexGrow={9999} flexShrink={1} flexBasis="0" minWidth="70%">
              <Box position="relative">
                <QuoteIcon
                  alt=""
                  width="109px"
                  height="74px"
                  src={modes[mode].quoteIcon}
                />
                <QuoteText>
                  {longQuote ? (
                    <>
                      <Box as="span" display={{ _: 'initial', sm: 'none' }}>
                        {quote}
                      </Box>
                      <Box as="span" display={{ _: 'none', sm: 'initial' }}>
                        {longQuote}
                      </Box>
                    </>
                  ) : (
                    quote
                  )}
                </QuoteText>
              </Box>
            </Box>
          </FlexBox>
        </TestimonialCard>
      </Anchor>
    </TestimonialWrapper>
  );
};
