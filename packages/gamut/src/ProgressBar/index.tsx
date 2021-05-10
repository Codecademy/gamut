import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Pattern, PatternName } from '../Pattern';

export type ProgressBarProps = {
  className?: string;

  /**
   * Whether to increase size and display the percentage as text.
   */
  size?: 'small' | 'medium' | 'large';

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
  variant: 'blue' | 'yellow' | 'dark' | 'light';

  /**
   * Base variant display themes.
   */
  bordered?: boolean;

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
    dark: {
      textColor: 'white',
    },
    light: {
      textColor: 'navy',
    },
  },
});

const progressBarBorderVariants = variant({
  default: 'basic',
  prop: 'border',
  variants: {
    basic: {
      borderWidth: '0',
    },
    bordered: {
      borderWidth: '1px',
      borderStyle: 'solid',
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
    light: {
      backgroundColor: 'navy',
      textColor: 'navy',
    },
    dark: {
      backgroundColor: 'white',
      textColor: 'white',
    },
  },
});

type ProgressBarElementProps = Pick<ProgressBarProps, 'variant' | 'size'>;

type ProgressBarElementWrapperProps = ProgressBarElementProps & {
  border: 'basic' | 'bordered';
};

const ProgressBarWrapper = styled.div<ProgressBarElementWrapperProps>`
  overflow: hidden;
  position: relative;
  ${progressBarBackgroundVariants};
  ${progressBarSizeVariants};
  ${progressBarBorderVariants};
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
  bordered,
  size = 'small',
  variant = 'blue',
}) => {
  return (
    <ProgressBarWrapper
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      role="figure"
      border={bordered ? 'bordered' : 'basic'}
      size={size}
      variant={variant}
    >
      {pattern && (
        <Pattern width="100%" position="absolute" zIndex={0} name={pattern} />
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
