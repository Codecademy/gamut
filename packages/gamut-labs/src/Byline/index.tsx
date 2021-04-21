import { Box, FlexBox } from '@codecademy/gamut';
import { LocationPinIcon } from '@codecademy/gamut-icons';
import React from 'react';

export type BylineProps = {
  firstName: string;
  occupation: string;
  location?: string;
  company?: string;
  lastName?: string;
};

export const Byline: React.FC<BylineProps> = ({
  firstName,
  occupation,
  location,
  company,
  lastName,
}) => (
  <FlexBox flexDirection="column">
    <Box
      as="span"
      data-testid="author-container"
      fontSize={18}
      fontWeight="title"
    >
      <span>{firstName}</span>
      {lastName && (
        <Box
          as="span"
          display={{ _: 'none', xs: 'contents' }}
        >{` ${lastName}`}</Box>
      )}
    </Box>
    <div data-testid="job-container">
      <span>{occupation}</span>
      {company && (
        <Box
          as="span"
          display={{ _: 'none', xs: 'contents' }}
        >{` @ ${company}`}</Box>
      )}
    </div>
    {location && (
      <FlexBox alignItems="center">
        <LocationPinIcon size={12} />
        <Box as="span" ml={12}>
          {location}
        </Box>
      </FlexBox>
    )}
  </FlexBox>
);
