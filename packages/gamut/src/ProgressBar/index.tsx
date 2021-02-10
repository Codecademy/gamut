import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';
import { HandlerProps } from '@codecademy/gamut-system';

import { Pattern, PatternName } from '../Pattern';

export type ProgressBarProps = {
  className?: string;

  /**
   * Whether to increase size and display the percentage as text.
   */
  large?: boolean;

  /**
   * Minimum amount of the bar to fill in visually.
   */
  minimumPercent?: number;

  /**
   * How much of the bar to fill in, as a number in [0, 100].
   */
  percent: number;

  /**
   * Style overrides to apply on top of the theme, if any.
   */
  style?: ProgressBarStyle;

  /**
   * Base color theme to extend from.
   */
  variant: 'blue' | 'yellow' | 'bordered';

  /**
   * Whether to use a pattern background
   */
  pattern?: PatternName;
};

export type ProgressBarStyle = {
  backgroundColor?: string;
  barColor?: string;
  borderColor?: string;
  fontColor?: string;
};

export type ProgressBarBordered = {
  bordered: boolean;
};

const progressBarBackgroundVariants = variant({
  default: 'blue',
  variants: {
    blue: {
      backgroundColor: 'navy',
    },
    yellow: {
      backgroundColor: `gray-100`,
    },
    bordered: {
      borderStyle: 'solid',
      borderWidth: '1px',
      textColor: 'white',
    },
  },
});

const progressBarForegroundVariants = variant({
  default: 'blue',
  variants: {
    blue: {
      backgroundColor: 'blue',
    },
    yellow: {
      backgroundColor: `yellow`,
    },
    bordered: {
      backgroundColor: 'white',
    },
  },
});

const progressBarTextVariants = variant({
  default: 'blue',
  variants: {
    blue: {
      textColor: 'white',
    },
    yellow: {
      textColor: `black`,
    },
    bordered: {
      textColor: 'black',
    },
  },
});

export type ProgressBarVariantProps = HandlerProps<
  typeof progressBarBackgroundVariants
>;

const ProgressBarWrapper = styled.div<ProgressBarVariantProps>`
  overflow: hidden;
  position: relative;
  ${progressBarBackgroundVariants};
`;

const Bar = styled.div<ProgressBarVariantProps>`
  align-items: center;
  display: flex;
  height: 100%;
  transition: width 0.5s;
  position: relative;
  ${progressBarForegroundVariants};
`;

const DisplayedPercent = styled.span<ProgressBarVariantProps>`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;
  ${progressBarTextVariants};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  minimumPercent = 0,
  percent,
  style = {},
  pattern,
  variant = 'blue',
}) => {
  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;
  const { backgroundColor, barColor, borderColor, fontColor } = style;

  return (
    <ProgressBarWrapper
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      className={className}
      role="figure"
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: radius,
        height: `${height}px`,
      }}
      variant={variant}
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
          backgroundColor: barColor,
          width: `${Math.max(minimumPercent, percent)}%`,
          ...(large && {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }),
        }}
      >
        {large && (
          <DisplayedPercent variant={variant} style={{ color: fontColor }}>
            {percent}%
          </DisplayedPercent>
        )}
      </Bar>
    </ProgressBarWrapper>
  );
};
