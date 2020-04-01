import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type ProgressBarProps = {
  className?: string;
  displayPercent?: boolean;
  hiddenLabel?: string;
  percent: number;
  style?: ProgressBarStyle;
};

export type ProgressBarStyle = {
  backgroundColor?: string;
  barColor?: string;
  fontColor?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  displayPercent,
  hiddenLabel,
  percent,
  style = {},
}) => {
  const {
    backgroundColor = 'black',
    barColor = 'gray',
    fontColor = 'white',
  } = style;
  const height = displayPercent ? 36 : 6;
  const radius = `${height / 2}px`;
  const visualPercent = `${percent * 100}%`;

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
      {hiddenLabel && <div className={styles.hiddenLabel}>{hiddenLabel}</div>}
      <div
        className={styles.bar}
        style={{
          background: barColor,
          width: visualPercent,
          ...(displayPercent && {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }),
        }}
      >
        {displayPercent && (
          <span className={styles.displayedPercent}>{visualPercent}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
