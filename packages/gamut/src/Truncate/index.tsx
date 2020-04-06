import React from 'react';
import TruncateMarkup from 'react-truncate-markup';

import s from './styles.module.scss';

type TruncateTextProps = {
  /** element for the component */
  as?: 'div' | 'span' | 'p';
  /** the maximum number of lines to display */
  lines?: number;
  /** Callback indicating if truncation was necessary */
  onTruncate?: (truncated: boolean) => void;
};

export const Truncate: React.FC<TruncateTextProps> = ({
  as: Element = 'span',
  lines,
  children,
  onTruncate,
}) => {
  const content = <Element className={s.wrapper}>{children}</Element>;

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
