import React, { useMemo, useLayoutEffect, useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';

import s from './styles.module.scss';

type TruncationTypes = 'fade' | 'ellipsis';

type TruncateTextProps = {
  /** element for the component */
  as?: 'div' | 'span' | 'p';
  /** the maximum number of lines to display */
  lines: number;
  /** Truncation visual treatment */
  truncateStyle?: TruncationTypes;
  /** Callback indicating if truncation was necessary */
  onTruncate?: (truncated: boolean) => void;
};

export const Truncate: React.FC<TruncateTextProps> = ({
  as: Element = 'span',
  lines,
  children,
  truncateStyle,
  onTruncate,
}) => {
  const [lineHeight, setHeight] = useState<string>();
  const id = useMemo(() => `truncate-${Math.floor(Math.random() * 10000)}`, []);

  const truncationIndicator = {
    ellipsis: <span>...</span>,
    fade: <div className={s.fade} style={{ height: lineHeight }} />,
  };

  useLayoutEffect(() => {
    const styleMap = window.getComputedStyle(document.getElementById(id));
    setHeight(styleMap.getPropertyValue('line-height'));
  }, [id]);

  const content = (
    <Element id={id} className={s.wrapper}>
      {children}
    </Element>
  );

  if (!lines) {
    return content;
  }

  return (
    <TruncateMarkup
      ellipsis={truncationIndicator[truncateStyle]}
      lines={lines}
      onTruncate={onTruncate}
    >
      {content}
    </TruncateMarkup>
  );
};

export default Truncate;
