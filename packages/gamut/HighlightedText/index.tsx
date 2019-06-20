import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './styles.scss';

export type HighlightedTextProps = {
  children?: string;
  wordProps?: HTMLAttributes<HTMLSpanElement>;
  textProps?: HTMLAttributes<HTMLElement>;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  children = '',
  textProps = {},
}) => {
  const combinedProps = {
    ...textProps,
    className: cx(styles.highlightedText, textProps.className),
  };

  const words = children
    .split(/(\s+)(\S+)/g)
    .filter(Boolean)
    .map((word, i) => (
      <span className={styles.word} key={i}>
        {word}
      </span>
    ));

  return <em {...combinedProps}>{words}</em>;
};

export default HighlightedText;
