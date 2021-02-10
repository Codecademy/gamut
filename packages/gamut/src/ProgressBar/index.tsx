import { deprecatedColors, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import React from 'react';

import { Pattern, PatternName } from '../Pattern';
import styles from './styles.module.scss';

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
    fontColor: 'initial',
  },
  yellow: {
    background: theme.colors[`gray-100`],
    barColor: theme.colors[`yellow-500`],
    fontColor: theme.colors.black,
  },
  bordered: {
    background: 'transparent',
    barColor: theme.colors.white,
    fontColor: 'inherit',
  },
};

const ProgressBarWrapper = styled.div<ProgressBarComponentProps>`
  overflow: hidden;
  position: relative;
  border: ${(props) =>
    props.progressTheme === 'bordered' ? 'solid 1px white' : '0'};
`;

const Bar = styled.div<ProgressBarComponentProps>`
  align-items: center;
  display: flex;
  height: 100%;
  transition: width 0.5s;
  position: relative;
`;

const DisplayedPercent = styled.span<ProgressBarComponentProps>`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;
  border: ${(props) =>
    props.progressTheme === 'yellow' ? 'black' : 'initial'};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  minimumPercent = 0,
  percent,
  style = {},
  theme = 'blue',
  pattern,
}) => {
  let { backgroundColor, barColor, fontColor } = style;
  backgroundColor = progressBarThemes[theme].background;
  barColor = progressBarThemes[theme].barColor;
  fontColor = progressBarThemes[theme].fontColor;

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
          <DisplayedPercent progressTheme={theme}>{percent}%</DisplayedPercent>
        )}
      </Bar>
    </ProgressBarWrapper>
  );
};
