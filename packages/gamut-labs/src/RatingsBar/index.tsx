import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

export type RatingsBarProps = {
  /**
   * Minimum amount of the bar to fill in visually.
   */
  minimumPercent?: number;

  /**
   * How much of the bar to fill in, as a number in [0, 100].
   */
  percent: number;
};

const RatingsBarWrapper = styled.div`
  border-width: ${pxRem(1)};
  border-style: solid;
  border-radius: ${pxRem(80)};
  background-color: ${theme.colors.white};
  height: ${pxRem(8)};
`;

const Bar = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  position: relative;
  border-radius: inherit;
  box-shadow: ${pxRem(0.5)} 0 0 ${pxRem(0.5)};
  background-color: ${theme.colors.yellow};
`;

export const RatingsBar: React.FC<RatingsBarProps> = ({
  minimumPercent = 0,
  percent,
}) => {
  return (
    <RatingsBarWrapper
      role="meter"
      aria-valuenow={percent}
      aria-valuemin={minimumPercent}
      aria-valuemax={100}
      aria-valuetext={`${percent}% of ratings`}
      aria-label="ratings bar"
      aria-live="polite"
    >
      <Bar
        data-testid="ratings-bar-bar"
        style={{
          width: `${Math.max(minimumPercent, percent)}%`,
        }}
      />
    </RatingsBarWrapper>
  );
};
