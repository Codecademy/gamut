import cx from 'classnames';
import React from 'react';
import styles from './styles.scss';
export const HighlightedText = ({ children = '', textProps = {} }) => {
  const combinedProps = {
    ...textProps,
    className: cx(styles.highlightedText, textProps.className),
  };
  const words = children
    .split(/(\s+)(\S+)/g)
    .filter(Boolean)
    .map((word, i) =>
      // eslint-disable-next-line react/no-array-index-key
      React.createElement('span', { className: styles.word, key: i }, word)
    );
  return React.createElement('em', Object.assign({}, combinedProps), words);
};
export default HighlightedText;
//# sourceMappingURL=index.js.map
