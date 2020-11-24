import cx from 'classnames';
import React from 'react';

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
  theme: 'blue' | 'yellow';
};

export type ProgressBarStyle = {
  backgroundColor?: string;
  barColor?: string;
  fontColor?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  minimumPercent = 0,
  percent,
  style = {},
  theme,
}) => {
  const { backgroundColor, barColor, fontColor } = style;
  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;

  return (
    <div
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      role="figure"
      className={cx(styles.progressBar, styles[theme], className)}
      style={{
        background: backgroundColor,
        borderRadius: radius,
        color: fontColor,
        height: `${height}px`,
      }}
    >
      <div
        className={styles.bar}
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
        {large && <span className={styles.displayedPercent}>{percent}%</span>}
      </div>
    </div>
  );
};
