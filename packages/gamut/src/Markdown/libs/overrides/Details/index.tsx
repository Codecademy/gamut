import React, { HTMLAttributes, useMemo } from 'react';

import { HTMLToReactNode } from '..';
// import styles from '../../../styles/_'
export interface MarkdownDetailsProps
  extends HTMLAttributes<HTMLDetailsElement> {
  open?: boolean;
  children?: HTMLToReactNode[];
}

/**
 * Details element
 * By default, the <summary> element is not required, but the default "details" text is not easily styled
 * This ensures we always have a summary element to style.
 */
export const Details: React.FC<MarkdownDetailsProps> = ({
  children,
  ...props
}) => {
  const editedDetails = useMemo(() => {
    const summaryIndex = children?.findIndex((e) => e.type === 'summary');
    const hasSummary = summaryIndex && summaryIndex > 0 && children;

    const realChildren = hasSummary
      ? children?.splice(summaryIndex, 1)
      : children;

    const realSummary = hasSummary ? (
      children[summaryIndex]
    ) : (
      <summary>Details</summary>
    );

    return { summary: realSummary, children: realChildren };
  }, [children]);

  return (
    <details data-testid="gamut-md-details" {...props}>
      {editedDetails.summary}
      {editedDetails.children}
    </details>
  );
};
