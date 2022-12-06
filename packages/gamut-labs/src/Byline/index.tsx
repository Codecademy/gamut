import { Box, FlexBox } from '@codecademy/gamut';
import { LocationPinIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

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
  <div>
    <Box
      data-testid="author-container"
      fontSize={18}
      fontWeight="title"
      whiteSpace="nowrap"
    >
      <span>{firstName}</span>
      {lastName && (
        <Box
          as="span"
          display={{ _: 'none', xs: 'initial' }}
        >{` ${lastName}`}</Box>
      )}
    </Box>
    <Box data-testid="job-container" whiteSpace="nowrap">
      <span>{occupation}</span>
      {company && (
        <Box
          as="span"
          display={{ _: 'none', xs: 'initial' }}
        >{` @ ${company}`}</Box>
      )}
    </Box>
    {location && (
      <FlexBox alignItems="center">
        <LocationPinIcon size={12} />
        <Box as="span" ml={12}>
          {location}
        </Box>
      </FlexBox>
    )}
  </div>
);
