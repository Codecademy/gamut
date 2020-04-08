import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';
import DownArrowIcon from '../Icon/icons/DownArrowIcon';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({
  className,
  contentId,
}) => {
  const href = `#${contentId}`;
  const onClick = () => document.querySelector<HTMLElement>(href)!.focus();

  return (
    <a
      className={cx(styles.skipToContent, className)}
      href={href}
      onClick={onClick}
      type="button"
    >
      Skip to Content <DownArrowIcon className={styles.downArrowIcon} />
    </a>
  );
};

export default SkipToContent;
