import { PatternProps } from '@codecademy/gamut-patterns';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../Typography';

export type ProgressBarProps = {
  className?: string;

  /**
   * Whether to increase size and display the percentage as text.
   */
  size?: 'small' | 'medium' | 'large' | 'xl';

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
  variant: 'blue' | 'yellow' | 'dark' | 'light' | 'rating';

  /**
   * Base variant display themes.
   */
  bordered?: boolean;

  /**
   * Pattern component to use as a background.
   */
  pattern?: React.ComponentType<PatternProps>;
};

const progressBarSizeVariants = variant({
  defaultVariant: 'small',
  prop: 'size',
  base: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },
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
      height: '18px',
      borderRadius: '9px',
      fontSize: 14,
    },
    xl: {
      height: '36px',
      borderRadius: '18px',
    },
  },
});

const progressBarBackgroundVariants = variant({
  defaultVariant: 'blue',
  variants: {
    blue: {
      bg: 'navy',
    },
    yellow: {
      bg: `gray-100`,
    },
    dark: {
      textColor: 'white',
    },
    light: {
      textColor: 'navy',
    },
    rating: {
      bg: 'white',
    },
  },
});

const progressBarBackgroundOverride = variant({
  defaultVariant: 'none',
  prop: 'backgroundOverride',
  variants: {
    pattern: {
      bg: 'transparent',
    },
    none: {},
  },
});

const progressBarBorderVariants = variant({
  defaultVariant: 'basic',
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
  defaultVariant: 'blue',
  base: {
    alignItems: 'center',
    height: '100%',
    display: 'flex',
    transition: 'width 0.5s',
    position: 'relative',
    borderRadius: 'inherit',
  },
  variants: {
    blue: {
      bg: 'blue',
      textColor: 'white',
    },
    yellow: {
      bg: `yellow`,
      textColor: `black`,
    },
    light: {
      bg: 'navy',
      textColor: 'navy',
    },
    dark: {
      bg: 'white',
      textColor: 'white',
    },
    rating: {
      bg: 'yellow',
    },
  },
});

type ProgressBarElementProps = Pick<ProgressBarProps, 'variant' | 'size'>;

type ProgressBarElementWrapperProps = ProgressBarElementProps & {
  border: 'basic' | 'bordered';
  backgroundOverride: 'pattern' | 'none';
};

const ProgressBarWrapper = styled.div<ProgressBarElementWrapperProps>`
  ${progressBarBackgroundVariants};
  ${progressBarSizeVariants};
  ${progressBarBorderVariants};
  ${progressBarBackgroundOverride};
`;

const Bar = styled.div(progressBarForegroundVariants);

const DisplayedPercent = styled.span`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  minimumPercent = 0,
  percent,
  pattern: Pattern,
  bordered,
  size = 'small',
  variant = 'blue',
}) => {
  return (
    <ProgressBarWrapper
      aria-live="polite"
      border={bordered ? 'bordered' : 'basic'}
      size={size}
      variant={variant}
      backgroundOverride={Pattern ? 'pattern' : 'none'}
    >
      <Text as="label" screenreader>
        {variant === 'rating'
          ? `${percent}% of ratings`
          : `Progress: ${percent}%`}
      </Text>
      {Pattern && <Pattern width="100%" position="absolute" zIndex={0} />}
      <Bar
        variant={variant}
        data-testid="progress-bar-bar"
        style={{
          width: `${Math.max(minimumPercent, percent)}%`,
        }}
      >
        {['large', 'xl'].includes(size) && (
          <DisplayedPercent aria-hidden>{percent}%</DisplayedPercent>
        )}
      </Bar>
    </ProgressBarWrapper>
  );
};
