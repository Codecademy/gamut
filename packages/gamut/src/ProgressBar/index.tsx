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
   * How much of the bar to fill in, as a number in [0, 100].
   */
  percent: number;

  theme: ProgressBarTheme;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  large,
  percent,
  theme,
}) => {
  const height = large ? 36 : 6;
  const radius = `${height / 2}px`;
  const visualPercent = `${percent}%`;

  return (
    <div
      aria-label={`Progress: ${visualPercent}`}
      aria-live="polite"
      className={cx(styles.progressBar, styles[theme], className)}
      style={{
        borderRadius: radius,
        height: `${height}px`,
      }}
    >
      <div
        className={styles.bar}
        style={{
          width: visualPercent,
          ...(large && {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }),
        }}
      >
        {large && (
          <span className={styles.displayedPercent}>{visualPercent}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
