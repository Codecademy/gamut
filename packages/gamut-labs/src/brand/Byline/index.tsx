import { Box, FlexBox } from '@codecademy/gamut';
import React from 'react';

import networkPin from './assets/networkPin.svg';
import styles from './styles.module.scss';

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
          display={{ base: 'none', xs: 'contents' }}
        >{` ${lastName}`}</Box>
      )}
    </Box>
    <div data-testid="job-container">
      <span>{occupation}</span>
      {company && (
        <Box
          as="span"
          display={{ base: 'none', xs: 'contents' }}
        >{` @ ${company}`}</Box>
      )}
    </div>
    {location && (
      <FlexBox alignItems="center">
        <img
          alt="Location pin icon"
          className={styles.networkPin}
          src={networkPin}
        />
        <span>{location}</span>
      </FlexBox>
    )}
  </FlexBox>
);
