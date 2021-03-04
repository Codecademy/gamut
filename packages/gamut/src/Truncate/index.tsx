import React, { isValidElement, useEffect, useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';

import { Box } from '../Box';

type TruncateProps = {
  /** class name for styling */
  className?: string;
  /** number of the maximum lines to display, pass false to disable truncation */
  lines: number;
  /** make the truncation toggleable */
  expanded?: boolean;
  /** Callback indicating if truncation was necessary */
  onTruncate?: (truncated: boolean) => void;
};

export const Truncate: React.FC<TruncateProps> = ({
  className,
  children,
  lines,
  expanded,
  onTruncate = () => {},
}) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    onTruncate(isTruncated);
  }, [isTruncated, onTruncate]);

  /** Truncate markup expects a single child element */
  const truncatedChildren = (
    <TruncateMarkup
      tokenize="characters"
      ellipsis={<span>...</span>}
      lines={lines}
      onTruncate={setIsTruncated}
    >
      <Box as="span" display="inline-block" width="100%" className={className}>
        {React.Children.map(children, (child) =>
          isValidElement(child) || typeof child === 'string' ? (
            child
          ) : (
            <TruncateMarkup.Atom>{child}</TruncateMarkup.Atom>
          )
        )}
      </Box>
    </TruncateMarkup>
  );

  /** If lines is false do not attempt to truncate */

  return expanded ? (
    <Box as="span" display="inline-block" width="100%" className={className}>
      {children}
    </Box>
  ) : (
    truncatedChildren
  );
};
