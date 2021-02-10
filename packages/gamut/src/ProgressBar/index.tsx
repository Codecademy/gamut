import { deprecatedColors, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

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
  theme: 'blue' | 'yellow' | 'bordered';

  /**
   * Whether to use a pattern background
   */
  pattern?: PatternName;
};

export type ProgressBarStyle = {
  backgroundColor?: string;
  barColor?: string;
  fontColor?: string;
};

export type ProgressBarTheme = {
  background: string;
  barColor: string;
  fontColor: string;
};

export type ProgressBarThemeObject = {
  blue: ProgressBarTheme;
  yellow: ProgressBarTheme;
  bordered: ProgressBarTheme;
};

type ProgressBarThemeKeys = keyof ProgressBarThemeObject;

export type ProgressBarComponentProps = {
  progressTheme: ProgressBarThemeKeys;
};

const progressBarThemes = {
  blue: {
    background: deprecatedColors.blue[800],
    barColor: theme.colors.blue,
    fontColor: 'currentColor',
  },
  yellow: {
    background: theme.colors[`gray-100`],
    barColor: theme.colors[`yellow-500`],
    fontColor: theme.colors.black,
  },
  bordered: {
    background: 'transparent',
    barColor: theme.colors.white,
    fontColor: theme.colors.white,
  },
};

const ProgressBarWrapper = styled.div<ProgressBarComponentProps>`
  overflow: hidden;
  position: relative;
  border: ${(props) =>
    props.progressTheme === 'bordered' ? 'solid 1px' : '0'};
`;

const Bar = styled.div<ProgressBarComponentProps>`
  align-items: center;
  display: flex;
  height: 100%;
  transition: width 0.5s;
  position: relative;
`;

const DisplayedPercent = styled.span`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  minimumPercent = 0,
  percent,
  style = {},
  theme,
  pattern,
}) => {
  const backgroundColor =
    style.backgroundColor ?? progressBarThemes[theme].background;
  const barColor = style.barColor ?? progressBarThemes[theme].barColor;
  const fontColor = style.fontColor ?? progressBarThemes[theme].fontColor;

  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;
  return (
    <ProgressBarWrapper
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      className={className}
      role="figure"
      style={{
        background: backgroundColor,
        borderRadius: radius,
        color: fontColor,
        height: `${height}px`,
      }}
      progressTheme={theme}
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
        progressTheme={theme}
        data-testid="progress-bar-bar"
        style={{
          background: barColor,
          width: `${Math.max(minimumPercent, percent)}%`,
          ...(large && {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }),
        }}
      >
        {large && (
          <DisplayedPercent
            style={{
              color: fontColor,
            }}
          >
            {percent}%
          </DisplayedPercent>
        )}
      </Bar>
    </ProgressBarWrapper>
  );
};
