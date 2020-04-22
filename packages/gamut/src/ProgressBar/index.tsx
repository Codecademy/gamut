import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type ProgressBarTheme = 'blue' | 'yellow';

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

  theme: ProgressBarTheme;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  minimumPercent = 0,
  percent,
  theme,
}) => {
  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;

  return (
    <div
      aria-label={`Progress: ${percent}%`}
      aria-live="polite"
      className={cx(styles.progressBar, styles[theme], className)}
      style={{
        borderRadius: radius,
        height: `${height}px`,
      }}
    >
      <div
        className={styles.bar}
        data-testid="progress-bar-bar"
        style={{
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

export default ProgressBar;
