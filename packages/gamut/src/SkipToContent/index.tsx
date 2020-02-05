import React from 'react';

import styles from './styles.module.scss';
import DownArrowIcon from '../Icon/icons/DownArrowIcon';

export type SkipToContentProps = {
  contentId: string;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({ contentId }) => {
  return (
    <a className={styles.skipToContent} href={`#${contentId}`} type="button">
      Skip to Content <DownArrowIcon className={styles.downArrowIcon} />
    </a>
  );
};

export default SkipToContent;
