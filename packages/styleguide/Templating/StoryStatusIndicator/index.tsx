import React from 'react';

import { StoryStatus } from '../StoryStatus';
import styles from './styles.module.scss';

export type StoryStatusIndicatorProps = {
  status: StoryStatus;
};

const displays = {
  [StoryStatus.Deprecated]: [
    '💀',
    'We want to kill this area. Please do not use it.',
  ],
  [StoryStatus.InProgress]: [
    '🛠',
    <>
      This area is still in progress.
      <br />
      Please ask around before using it!
    </>,
  ],
  [StoryStatus.NotReady]: [
    '❌',
    <>
      This area is not yet ready for use.
      <br />
      Please ask around for designs.
    </>,
  ],
  [StoryStatus.Ready]: ['✅', 'This area is ready for use. Hooray!'],
} as const;

const StoryStatusIndicator: React.FC<StoryStatusIndicatorProps> = ({
  status,
}) => {
  const [emoji, message] = displays[status];

  return (
    <div className={styles.indicator}>
      <span>{message}</span>
      <span className={styles.emoji} role="presentation">
        {emoji}
      </span>
    </div>
  );
};

export default StoryStatusIndicator;
