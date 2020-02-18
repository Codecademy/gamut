import React, { useCallback } from 'react';

import styles from './styles.module.scss';
import DownArrowIcon from '../Icon/icons/DownArrowIcon';

export type SkipToContentProps = {
  contentId: string;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({ contentId }) => {
  const href = `#${contentId}`;
  const onClick = useCallback(() => {
    document.querySelector<HTMLElement>(href)!.focus();
  }, []);

  return (
    <a
      className={styles.skipToContent}
      href={href}
      onClick={onClick}
      type="button"
    >
      Skip to Content <DownArrowIcon className={styles.downArrowIcon} />
    </a>
  );
};

export default SkipToContent;
