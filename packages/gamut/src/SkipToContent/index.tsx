import React from 'react';

import styles from './styles.module.scss';

export type SkipToContentProps = {
  selector: string;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({ selector }) => {
  return (
    <button
      className={styles.skipToContent}
      onClick={() => document.querySelector(selector).scrollIntoView()}
      type="button"
    >
      Skip to Content
    </button>
  );
};

export default SkipToContent;
