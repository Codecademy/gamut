import React from 'react';
import TruncateMarkup from 'react-truncate-markup';
import cx from 'classnames';

import styles from './styles.module.scss';

type TruncateProps = {
  /** element for the component */
  as?: 'div' | 'span' | 'p';
  /** class name for styling */
  className?: string;
  /** number of the maximum lines to display, pass false to disable truncation */
  lines?: number | false;
  /** Callback indicating if truncation was necessary */
  onTruncate?: (truncated: boolean) => void;
};

export const Truncate: React.FC<TruncateProps> = ({
  as: Element = 'span',
  className,
  lines,
  children,
  onTruncate,
}) => {
  /** Truncate markup expects a single child element */
  const content = (
    <Element className={cx(styles.wrapper, className)}>{children}</Element>
  );

  /** If lines is false do not attempt to truncate */
  if (!lines) {
    return content;
  }

  return (
    <TruncateMarkup
      ellipsis={<span>...</span>}
      lines={lines}
      onTruncate={onTruncate}
    >
      {content}
    </TruncateMarkup>
  );
};
