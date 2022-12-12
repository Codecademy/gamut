import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

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
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="ratings bar"
      aria-live="polite"
    >
      <Bar
        data-testid="ratings-bar-bar"
        style={{
          width: `${Math.max(minimumPercent, percent)}%`,
          boxShadow: percent > 0 ? `${pxRem(0.5)} 0 0 ${pxRem(0.5)}` : 'none',
        }}
      />
    </RatingsBarWrapper>
  );
};
