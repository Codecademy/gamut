import React from 'react';
import TruncateMarkup from 'react-truncate-markup';

import s from './styles.module.scss';

type TruncateProps = {
  /** element for the component */
  as?: 'div' | 'span' | 'p';
  /** number of the maximum lines to display, pass false to disable truncation */
  lines?: number | false;
  /** Callback indicating if truncation was necessary */
  onTruncate?: (truncated: boolean) => void;
};

export const Truncate: React.FC<TruncateProps> = ({
  as: Element = 'span',
  lines,
  children,
  onTruncate,
}) => {
  /** Truncate markup expects a single child element */
  const content = <Element className={s.wrapper}>{children}</Element>;

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

export default Truncate;
