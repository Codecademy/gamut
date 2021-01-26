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
      tokenize="words"
      ellipsis={<span>...</span>}
      lines={lines}
      onTruncate={(truncated) => {
        setIsTruncated(truncated);
      }}
    >
      <div>
        {React.Children.map(children, (child) =>
          isValidElement(child) || typeof child === 'string' ? (
            child
          ) : (
            <TruncateMarkup.Atom>{child}</TruncateMarkup.Atom>
          )
        )}
      </div>
    </TruncateMarkup>
  );

  /** If lines is false do not attempt to truncate */

  return (
    <Box
      className={className}
      display="flex"
      alignItems="flex-start"
      columnGap={8}
    >
      {expanded ? children : truncatedChildren}
    </Box>
  );
};
