import { colors, swatches } from '@codecademy/gamut-styles';
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

export type ProgressBarComponentProps = {
  backgroundTheme: string;
};

const progressBarThemes = {
  blue: {
    background: colors.blue[800],
    barColor: colors.blue[500],
  },
  yellow: {
    background: swatches.gray[100],
    barColor: colors.yellow[500],
  },
  bordered: { background: 'transparent', barColor: colors.white },
};

const ProgressBarWrapper = styled.div<ProgressBarComponentProps>`
  overflow: hidden;
  position: relative;
  background: ${(props) => progressBarThemes[props.backgroundTheme].background};
  border: ${(props) =>
    props.backgroundTheme === 'bordered' ? 'solid 1px white' : '0'};
`;

const Bar = styled.div<ProgressBarComponentProps>`
  align-items: center;
  display: flex;
  height: 100%;
  transition: width 0.5s;
  position: relative;
  background: ${(props) => progressBarThemes[props.backgroundTheme].barColor};
`;

const DisplayedPercent = styled.span<ProgressBarComponentProps>`
  font-weight: bold;
  padding: 0.5rem;
  text-align: right;
  width: 100%;

  border: ${(props) =>
    props.backgroundTheme === 'yellow' ? 'black' : 'initial'};
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
  const { backgroundColor, barColor, fontColor } = style;
  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;

  return (
    <ProgressBarWrapper
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      backgroundTheme={theme}
      className={className}
      role="figure"
      style={{
        background: backgroundColor,
        borderRadius: radius,
        color: fontColor,
        height: `${height}px`,
      }}
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
        backgroundTheme={theme}
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
          <DisplayedPercent backgroundTheme={theme}>
            {percent}%
          </DisplayedPercent>
        )}
      </Bar>
    </ProgressBarWrapper>
  );
};
