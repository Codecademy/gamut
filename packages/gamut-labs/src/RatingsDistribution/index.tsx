import { Box, FlexBox, Text } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

interface RatingsCounts {
  fives: number;
  fours: number;
  threes: number;
  twos: number;
  ones: number;
}

interface RatingsDistributionProps {
  counts: RatingsCounts;
  totalCounts: number;
}

const RatingsBar = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  position: relative;
  border-radius: inherit;
  background-color: ${themed('colors.yellow')};
`;

export const RatingsDistribution: React.FC<RatingsDistributionProps> = ({
  counts,
  totalCounts,
}) => {
  const getRatingPercentages = (counts: RatingsCounts, totalCount: number) =>
    Object.values(counts).reduce((acc, numRating, index) => {
      const percentOfRatings = Math.round((numRating / totalCount) * 100);
      return { ...acc, [`${5 - index} stars`]: percentOfRatings };
    }, {});

  const ratingPercentages = getRatingPercentages(counts, totalCounts);

  return (
    <FlexBox alignItems="center" flexDirection="column">
      {Object.entries(ratingPercentages).map(([numRating, percent]) => (
        <FlexBox pt={4}>
          <Text>{`${numRating}`}</Text>
          <Box px={16}>
            <RatingsBar>
              <Text as="label" screenreader>{`${percent}% of ratings`}</Text>
            </RatingsBar>
          </Box>
          <Text aria-hidden>{`${percent}%`}</Text>
        </FlexBox>
      ))}
    </FlexBox>
  );
};
