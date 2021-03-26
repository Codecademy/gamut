import React from 'react';

import styles from './styles.module.scss';

export type HighlightedTextProps = {
  /**
   * Text, with support for newlines and whitespace.
   */
  children?: string;
};

/**
 * @deprecated
 */

export const HighlightedText = ({ children = '' }: HighlightedTextProps) => {
  const words = children
    .split(/(\s+)(\S+)/g)
    .filter(Boolean)
    .map((word, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span className={styles.word} key={i}>
        {word}
      </span>
    ));

  return <em className={styles.highlightedText}>{words}</em>;
};
