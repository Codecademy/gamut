import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';
import { ArrowDownIcon } from '@codecademy/gamut-icons';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
  preventScroll?: boolean;
};

export const SkipToContent: React.FC<SkipToContentProps> = ({
  className,
  contentId,
  preventScroll,
}) => {
  const href = `#${contentId}`;
  const onClick = () =>
    document.querySelector<HTMLElement>(href)!.focus({ preventScroll });

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
