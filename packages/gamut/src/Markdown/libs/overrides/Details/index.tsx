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
  const isMissingSummary = useMemo(() => {
    return children?.every((e) => e.type !== 'summary');
  }, [children]);
  const summary = isMissingSummary ? <summary>Details</summary> : null;
  return (
    <details data-testid="gamut-md-details" {...props}>
      {summary}
      {children}
    </details>
  );
};
