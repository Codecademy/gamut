import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Pattern, PatternName } from '../Pattern';

export type ProgressBarProps = {
  className?: string;

  /**
   * Whether to increase size and display the percentage as text.
   */
  size?: 'small' | 'large';

  /**
   * Minimum amount of the bar to fill in visually.
   */
  minimumPercent?: number;

  /**
   * How much of the bar to fill in, as a number in [0, 100].
   */
  percent: number;

  /**
   * Base variant display themes.
   */
  variant: 'blue' | 'yellow' | 'bordered-light' | 'bordered-dark';

  /**
   * Whether to use a pattern background
   */
  pattern?: PatternName;
};

const progressBarSizeVariants = variant({
  default: 'small',
  prop: 'size',
  variants: {
    small: {
      height: '6px',
      borderRadius: '3px',
    },
    medium: {
      height: '8px',
      borderRadius: '80px',
    },
    large: {
      height: '36px',
      borderRadius: '18px',
    },
  },
});

const progressBarBackgroundVariants = variant({
  default: 'blue',
  variants: {
    blue: {
      backgroundColor: 'navy',
    },
    yellow: {
      backgroundColor: `gray-100`,
    },
    ['bordered-light']: {
      borderStyle: 'solid',
      borderWidth: '1px',
      textColor: 'white',
    },
    ['bordered-dark']: {
      borderStyle: 'solid',
      borderWidth: '1px',
      textColor: 'navy',
    },
  },
});

const progressBarForegroundVariants = variant({
  default: 'blue',
  variants: {
    blue: {
      backgroundColor: 'blue',
      textColor: 'white',
    },
    yellow: {
      backgroundColor: `yellow`,
      textColor: `black`,
    },
    ['bordered-light']: {
      backgroundColor: 'white',
      textColor: 'navy',
    },
    ['bordered-dark']: {
      backgroundColor: 'navy',
      textColor: 'white',
    },
  },
});

type ProgressBarElementProps = Pick<ProgressBarProps, 'size' | 'variant'>;

const ProgressBarWrapper = styled.div<ProgressBarElementProps>`
  overflow: hidden;
  position: relative;
  ${progressBarBackgroundVariants};
  ${progressBarSizeVariants};
`;

const Bar = styled.div<ProgressBarElementProps>`
  align-items: center;
  display: flex;
  height: 100%;
  transition: width 0.5s;
  position: relative;
  border-radius: inherit;
  ${progressBarForegroundVariants};
`;

const DisplayedPercent = styled.span`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  minimumPercent = 0,
  percent,
  pattern,
  size = 'small',
  variant = 'blue',
}) => {
  return (
    <ProgressBarWrapper
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      role="figure"
      variant={variant}
      size={size}
    >
      {pattern && (
        <Pattern
          textColor="navy"
          width="100%"
          position="absolute"
          zIndex={0}
          name={pattern}
        />
      )}
      <Bar
        variant={variant}
        data-testid="progress-bar-bar"
        style={{
          width: `${Math.max(minimumPercent, percent)}%`,
        }}
      >
        {size === 'large' && <DisplayedPercent>{percent}%</DisplayedPercent>}
      </Bar>
    </ProgressBarWrapper>
  );
};
