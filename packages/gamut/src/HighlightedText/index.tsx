import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type HighlightedTextProps = {
  /**
   * Text, with support for new lines and whitespace.
   */
  children?: string;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  children = '',
}) => {
  const combinedProps = {
    className: cx(styles.highlightedText),
  };

  const words = children
    .split(/(\s+)(\S+)/g)
    .filter(Boolean)
    .map((word, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span className={styles.word} key={i}>
        {word}
      </span>
    ));

  return <em {...combinedProps}>{words}</em>;
};
