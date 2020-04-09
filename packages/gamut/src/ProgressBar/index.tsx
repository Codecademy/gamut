import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type ProgressBarProps = {
  className?: string;

  /**
   * Whether to increase size and display the percentage as text.
   */
  displayLabel?: boolean;

  /**
   * How much of the bar to fill in, as a number in [0, 100].
   */
  percent: number;

  style: ProgressBarStyle;
};

export type ProgressBarStyle = {
  backgroundColor: string;
  barColor: string;
  fontColor?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  displayLabel,
  percent,
  style,
}) => {
  const { backgroundColor, barColor, fontColor } = style;
  const height = displayLabel ? 36 : 6;
  const radius = `${height / 2}px`;
  const visualPercent = `${percent}%`;

  return (
    <div
      aria-label={`Progress: ${visualPercent}`}
      aria-live="polite"
      className={cx(styles.progressBar, className)}
      style={{
        background: backgroundColor,
        borderRadius: radius,
        color: fontColor,
        height: `${height}px`,
      }}
    >
      <div
        className={styles.bar}
        style={{
          background: barColor,
          width: visualPercent,
          ...(displayLabel && {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }),
        }}
      >
        {displayLabel && (
          <span className={styles.displayedPercent}>{visualPercent}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
