import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './styles.module.scss';

export type HighlightColors =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'beige'
  | 'gray';

export type HighlightedTextProps = {
  /** String to transform into the contents of the highlighted text */
  children?: string;

  /** Standard element properties that should be applied to the individual words that are being highlighted */
  wordProps?: HTMLAttributes<HTMLSpanElement>;

  /** Standard element properties that should be applied to the entire set of words */
  textProps?: HTMLAttributes<HTMLElement>;

  /** The color that should display behind the text; if not provided, defaults to yellow */
  color?: HighlightColors;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  children = '',
  textProps = {},
  color = 'yellow',
}) => {
  const combinedProps = {
    ...textProps,
    className: cx(styles.highlightedText, textProps.className, styles[color]),
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

export default HighlightedText;
