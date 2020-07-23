import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';
import { ArrowDownIcon } from '@codecademy/gamut-icons';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
  /**
   * A Boolean value indicating whether or not the browser should scroll the document to bring the newly-focused element into view.
   */
  preventScroll?: boolean;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({
  className,
  contentId,
  preventScroll,
}) => {
  const href = `#${contentId}`;
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    return document.querySelector<HTMLElement>(href)!.focus({ preventScroll });
  };

  return (
    <a
      className={cx(styles.skipToContent, className)}
      href={href}
      onClick={onClick}
      type="button"
    >
      Skip to Content
      <ArrowDownIcon aria-hidden className={styles.downArrowIcon} />
    </a>
  );
};

export default SkipToContent;
