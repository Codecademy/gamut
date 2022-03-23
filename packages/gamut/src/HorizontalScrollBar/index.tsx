import React, { Children, useEffect, useRef } from 'react';

import { FlexBox } from '../Box';

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  const elementsRef = useRef<HTMLBaseElement[]>([]);

  useEffect(() => {
    if (!elementsRef.current.length) {
      Children.map(
        children,
        (child, index) => (elementsRef.current[index] = child)
      );
    }
  }, [elementsRef]);

  return <FlexBox>{children}</FlexBox>;
};
