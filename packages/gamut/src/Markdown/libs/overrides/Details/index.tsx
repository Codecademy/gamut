import { HTMLAttributes, useMemo } from 'react';
import * as React from 'react';

import { Box } from '../../../../Box';
import { HTMLToReactNode } from '..';
// import styles from '../../../styles/_'

interface MarkdownHTMLDetailsAttributes
  extends Omit<HTMLAttributes<HTMLDetailsElement>, 'children'> {}
export interface MarkdownDetailsProps extends MarkdownHTMLDetailsAttributes {
  open?: boolean;
  children?: HTMLToReactNode[];
}

interface GetDetailChildrenProps extends MarkdownDetailsProps {
  summaryIndex?: number;
  hasSummary: boolean;
}

const getStyledDetailChildren = ({
  summaryIndex,
  hasSummary,
  children,
}: GetDetailChildrenProps) => {
  if (children && summaryIndex) {
    const copiedChildren = hasSummary
      ? children.slice(0, summaryIndex).concat(children.slice(summaryIndex + 1))
      : children;

    const summary = hasSummary ? (
      children[summaryIndex]
    ) : (
      <summary>Details</summary>
    );

    return {
      summary,
      children: (
        <Box ml={24}>
          <>{copiedChildren.map((elem) => elem)}</>
        </Box>
      ),
    };
  }
};

/**
 * Details element
 * By default, the <summary> element is not required, but the default "details" text is not easily styled
 * This ensures we always have a summary element to style and that the details are indented
 */
export const Details: React.FC<MarkdownDetailsProps> = ({
  children,
  ...props
}) => {
  const editedDetails = useMemo(() => {
    const summaryIndex = children?.findIndex((e) => e.type === 'summary');
    const hasSummary = Boolean(summaryIndex && summaryIndex > 0 && children);

    return getStyledDetailChildren({ summaryIndex, hasSummary, children });
  }, [children]);

  return (
    <details data-testid="gamut-md-details" {...props}>
      <>
        {editedDetails?.summary}
        {editedDetails?.children}
      </>
    </details>
  );
};
